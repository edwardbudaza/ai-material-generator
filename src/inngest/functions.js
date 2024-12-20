import { db } from '@/configs/db';
import { inngest } from './client';
import {
  USER_TABLE,
  CHAPTER_NOTES_TABLE,
  STUDY_MATERIAL_TABLE,
} from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { generateNotesAIModel } from '@/configs/gemini';

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
  {
    id: 'generate-course-notes',
  },
  { event: 'notes.generate' },
  async ({ event, step }) => {
    const { course } = event.data;

    // Generate Notes for Each Chapter with AI
    const notesResult = await step.run('Generate Chapter Notes', async () => {
      const Chapters = course?.courseLayout?.chapters;
      let index = 0;
      Chapters.forEach(async (chapter) => {
        const PROMPT = `Generate exam material detailed content for each chapter, make sure to include all topc points in the contenet,
        make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters: ${JSON.stringify(chapter)}
        `;
        const result = await generateNotesAIModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp,
        });
        index += 1;
      });
      return 'Completed';
    });

    // Update Status to 'Ready'
    const updateCourseStatusResult = await step.run(
      'Update Course Status to Ready',
      async () => {
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: 'Ready',
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
        return 'Success';
      }
    );
  }
);
