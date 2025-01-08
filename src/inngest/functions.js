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
  GenerateQuizAIModel,
} from '@/configs/gemini';

export const helloWorld = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello.world' },
  async ({ event, step }) => {
    await step.sleep('wait-a-moment', '1s');
    return { message: `Hello ${event.data.email}!` };
  }
);

export const createNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {
    const { user } = event.data;
    const email = user.email?.emailAddress;
    const fullName = user.fullName;

    if (!email || !fullName) {
      throw new Error('Invalid user payload: Missing email or fullName');
    }

    console.log('Processed Payload:', { email, fullName });

    try {
      const existingUser = await step.run(
        'Check for Existing User',
        async () => {
          const users = await db
            .select()
            .from(USER_TABLE)
            .where(eq(USER_TABLE.email, email));
          return users[0];
        }
      );

      if (!existingUser) {
        const newUser = await step.run('Create User', async () => {
          const inserted = await db
            .insert(USER_TABLE)
            .values({
              name: fullName,
              email,
            })
            .returning();
          return inserted[0];
        });
        return { success: true, userId: newUser.id };
      }

      return { success: true, userId: existingUser.id };
    } catch (error) {
      console.error('Database operation failed:', error);
      throw new Error('Failed to process user creation');
    }
  }
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
              chapterId: chapter?.chapterId,
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
      const AIResult = await step.run(
        'Generate Flashcard Content',
        async () => {
          try {
            const response =
              studyType === 'flashcard'
                ? await GenerateStudyTypeContentAiModel.sendMessage(prompt)
                : await GenerateQuizAIModel.sendMessage(prompt);
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
            .set({ content: AIResult, status: 'Ready' })
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
