import { db } from '@/configs/db';
import { inngest } from './client';
import {
  USER_TABLE,
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from '@/configs/schema';
import { eq } from 'drizzle-orm';
import {
  generateNotesAIModel,
  GenerateStudyTypeContentAiModel,
} from '@/configs/gemini';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: 'create-user' }, // Unique identifier for the function
  { event: 'user.create' }, // Triggered on the "user.create" event
  async ({ event, step }) => {
    const { user } = event.data; // Extract user data from the event

    if (!user?.primaryEmailAddress?.emailAddress) {
      return {
        status: 'Error',
        message: 'User email is missing. Cannot create user.',
      };
    }

    const result = await step.run('Check and Create User', async () => {
      try {
        // Check if the user already exists in the database
        const existingUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user.primaryEmailAddress.emailAddress));

        if (existingUser.length > 0) {
          console.log('User already exists:', existingUser);
          return { status: 'UserExists', data: existingUser };
        }

        // Insert new user into the database
        const newUser = await db
          .insert(USER_TABLE)
          .values({
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
          })
          .returning({ id: USER_TABLE.id });

        console.log('New user created:', newUser);
        return { status: 'NewUserCreated', data: newUser };
      } catch (error) {
        console.error('Error while checking or creating user:', error);
        throw new Error('Database operation failed.');
      }
    });

    return {
      status: 'Success',
      result,
    };
  }

  // TODO: Add additional steps for notifications, such as:
  // 1. Send Welcome Email Notification
  // 2. Send a Follow-Up Email After 3 Days
);

export const GenerateNotes = inngest.createFunction(
  { id: 'generate-course-notes' },
  { event: 'notes.generate' },
  async ({ event, step }) => {
    const { course } = event.data;

    try {
      // Step 1: Generate Notes for Each Chapter with AI
      const notesResult = await step.run('Generate Chapter Notes', async () => {
        try {
          const chapters = course?.courseLayout?.chapters;
          if (!chapters || !Array.isArray(chapters)) {
            throw new Error('Invalid or missing chapters data.');
          }

          let index = 0;
          for (const chapter of chapters) {
            const PROMPT = `Generate exam material detailed content for each chapter, make sure to include all topic points in the content.
              Ensure the response is in HTML format only (Do not include HTML, Head, Body, or Title tags). The chapters: ${JSON.stringify(chapter)}`;

            const aiResult = await generateNotesAIModel.sendMessage(PROMPT);
            const aiResponse = await aiResult.response.text();

            await db.insert(CHAPTER_NOTES_TABLE).values({
              chapterId: index,
              courseId: course?.courseId,
              notes: aiResponse,
            });
            index += 1;
          }

          return 'Chapter notes generation completed successfully';
        } catch (error) {
          throw new Error(`Error generating chapter notes: ${error.message}`);
        }
      });

      // Step 2: Update Course Status to 'Ready'
      await step.run('Update Course Status to Ready', async () => {
        try {
          await db
            .update(STUDY_MATERIAL_TABLE)
            .set({ status: 'Ready' })
            .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
          return 'Course status updated to Ready';
        } catch (error) {
          throw new Error(`Error updating course status: ${error.message}`);
        }
      });
    } catch (error) {
      console.error(`Error in GenerateNotes: ${error.message}`);
      throw error; // Propagate the error for further handling
    }
  }
);

//Used to generate Flashcards, Quiz and Q&A
export const GenerateStudyTypeContent = inngest.createFunction(
  { id: 'Generate Study Type Content' },
  { event: 'studyType.content' },
  async ({ event, step }) => {
    const { studyType, prompt, courseId, recordId } = event.data;

    try {
      // Step 1: Generate Flashcard content using AI
      const flashcardContent = await step.run(
        'Generate Flashcard Content',
        async () => {
          try {
            const response =
              await GenerateStudyTypeContentAiModel.sendMessage(prompt);
            const parsedContent = JSON.parse(await response.response.text());
            if (!parsedContent)
              throw new Error('AI response is empty or invalid');
            return parsedContent;
          } catch (error) {
            throw new Error(`AI content generation failed: ${error.message}`);
          }
        }
      );

      // Step 2: Update the database record with generated content
      await step.run('Update Database with Generated Content', async () => {
        try {
          const updateResult = await db
            .update(STUDY_TYPE_CONTENT_TABLE)
            .set({ content: flashcardContent, status: 'Ready' })
            .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

          if (!updateResult)
            throw new Error('Database update returned no result');
          return 'Content successfully updated in the database';
        } catch (error) {
          throw new Error(`Database update failed: ${error.message}`);
        }
      });
    } catch (error) {
      console.error(`[GenerateStudyTypeContent] Error: ${error.message}`);
      throw error; // Re-throw to allow upstream error handling
    }
  }
);
