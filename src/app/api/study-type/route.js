import { db } from '@/configs/db';
import {
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

/**
 * Handles POST requests to fetch study content based on the provided study type.
 * @param {Request} req - Incoming HTTP request object.
 * @returns {NextResponse} JSON response with the requested data or error details.
 */
export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    // Validate required inputs
    if (!courseId || !studyType) {
      return NextResponse.json(
        { error: 'Missing required fields: courseId or studyType' },
        { status: 400 }
      );
    }

    // Process based on the study type
    switch (studyType) {
      case 'ALL':
        return await handleAllStudyTypes(courseId);

      case 'notes':
        return await handleNotes(courseId);

      default:
        return NextResponse.json(
          { error: `Invalid studyType: ${studyType}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in POST /study-content:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * Fetches all study types (notes, flashcards, quiz, and Q&A) for the given course ID.
 * @param {string} courseId - The course identifier.
 * @returns {NextResponse} JSON response with the combined data.
 */
async function handleAllStudyTypes(courseId) {
  try {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    const contentList = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

    const result = {
      notes,
      flashcard: contentList.find((item) => item.type === 'flashcard') || null,
      quiz: contentList.find((item) => item.type === 'quiz') || null,
      qa: contentList.find((item) => item.type === 'qa') || null,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in handleAllStudyTypes:', error);
    throw new Error('Failed to fetch all study types');
  }
}

/**
 * Fetches notes for the given course ID.
 * @param {string} courseId - The course identifier.
 * @returns {NextResponse} JSON response with the notes data.
 */
async function handleNotes(courseId) {
  try {
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error in handleNotes:', error);
    throw new Error('Failed to fetch notes');
  }
}
