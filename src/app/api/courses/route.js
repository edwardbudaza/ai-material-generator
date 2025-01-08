import { db } from '@/configs/db';
import { STUDY_MATERIAL_TABLE } from '@/configs/schema';
import { asc, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const courseId = searchParams.get('courseId');

    // If courseId is provided, fetch specific course
    if (courseId) {
      console.log(`Fetching course with ID: ${courseId}`);

      const course = await db
        .select()
        .from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
        .limit(1);

      if (!course.length) {
        return NextResponse.json(
          { message: 'Course not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        result: course[0],
        message: 'Course fetched successfully',
      });
    }

    // If no courseId, validate email for listing all courses
    if (!email) {
      return NextResponse.json(
        { message: 'Email parameter is required for listing courses.' },
        { status: 400 }
      );
    }

    console.log(`Fetching all courses for user: ${email}`);

    // Query the database for all user's courses
    const courses = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, email))
      .orderBy(desc(STUDY_MATERIAL_TABLE.createdAt));

    console.log(`Found ${courses.length} courses for user`);

    return NextResponse.json({
      result: courses,
      message: 'Courses fetched successfully',
    });
  } catch (error) {
    console.error('Error in GET /api/courses:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
