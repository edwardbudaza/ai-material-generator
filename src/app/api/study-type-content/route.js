import { db } from '@/configs/db';
import { STUDY_TYPE_CONTENT_TABLE } from '@/configs/schema';
import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body
    const { chapters, courseId, type } = await req.json();

    if (!chapters || !courseId || !type) {
      throw new Error(
        'Missing required parameters: chapters, courseId, or type'
      );
    }

    // Construct the AI prompt
    const prompt = `
      Generate up to 15 concise flashcards on the topic: '${chapters}'. 
      Provide the output in JSON format, where each flashcard contains:
      - 'front': A question or term
      - 'back': An answer or explanation
    `.trim();

    // Insert record into the database and set status to 'Generating...'
    const [newRecord] = await db
      .insert(STUDY_TYPE_CONTENT_TABLE)
      .values({ courseId, type })
      .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    if (!newRecord || !newRecord.id) {
      throw new Error('Failed to insert record into the database');
    }

    // Trigger the Inngest function
    await inngest.send({
      name: 'studyType.content',
      data: {
        studyType: type,
        prompt,
        courseId,
        recordId: newRecord.id,
      },
    });

    // Respond with the new record ID
    return NextResponse.json({ id: newRecord.id });
  } catch (error) {
    console.error(`[POST /studyType] Error: ${error.message}`);
    return NextResponse.json(
      { error: error.message },
      { status: 400 } // Bad Request
    );
  }
}
