import { db } from '@/configs/db';
import { STUDY_MATERIAL_TABLE } from '@/configs/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { createdBy } = await req.json();

    if (!createdBy) {
      return NextResponse.json(
        { error: 'createdBy is required' },
        { status: 400 }
      );
    }

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id));

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function GET(req) {
//   const reqUrl = req.url;
//   const { searchParams } = new URL(reqUrl);
//   const courseId = searchParams?.get('courseId');

//   const course = await db
//     .select()
//     .from(STUDY_MATERIAL_TABLE)
//     .where(eq(STUDY_MATERIAL_TABLE?.courseId, courseId));

//   return NextResponse.json({ reult: course[0] });
// }

export async function GET(req) {
  try {
    // Input validation
    const courseId = new URL(req.url).searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        {
          error: 'Course ID is required',
        },
        { status: 400 }
      );
    }

    // Database query with proper error handling
    const courses = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE?.courseId, courseId))
      .limit(1);

    // Handle case when no course is found
    if (!courses.length) {
      return NextResponse.json(
        {
          error: 'Course not found',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      result: courses[0],
    });
  } catch (error) {
    console.error('Error fetching course', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          process.env.NODE_ENV === 'development' ? eroor.message : undefined,
      },
      {
        status: 500,
      }
    );
  }
}
