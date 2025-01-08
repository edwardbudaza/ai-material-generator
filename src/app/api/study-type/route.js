import { db } from '@/configs/db';
import {
  CHAPTER_NOTES_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
} from '@/configs/schema';
import { asc, eq } from 'drizzle-orm';
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

      case 'flashcard':
        return await handleFlashcards(courseId);

      case 'quiz':
        return await handleQuiz(courseId);

      case 'qa':
        return await handleQA(courseId);

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
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId))
      .orderBy(asc(CHAPTER_NOTES_TABLE.chapterId));

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error in handleNotes:', error);
    throw new Error('Failed to fetch notes');
  }
}

/**
 * Fetches flashcards for the given course ID.
 * @param {string} courseId - The course identifier.
 * @returns {NextResponse} JSON response with the flashcard data.
 */
async function handleFlashcards(courseId) {
  try {
    const flashcards = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, 'flashcard')
      );

    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error in handleFlashcards:', error);
    throw new Error('Failed to fetch flashcards');
  }
}

/**
 * Fetches quizzes for the given course ID.
 * @param {string} courseId - The course identifier.
 * @returns {NextResponse} JSON response with the quiz data.
 */
async function handleQuiz(courseId) {
  try {
    const quizzes = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, 'quiz')
      );

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error in handleQuiz:', error);
    throw new Error('Failed to fetch quizzes');
  }
}

/**
 * Fetches Q&A for the given course ID.
 * @param {string} courseId - The course identifier.
 * @returns {NextResponse} JSON response with the Q&A data.
 */
async function handleQA(courseId) {
  try {
    const qa = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, 'qa')
      );

    return NextResponse.json(qa);
  } catch (error) {
    console.error('Error in handleQA:', error);
    throw new Error('Failed to fetch Q&A');
  }
}
