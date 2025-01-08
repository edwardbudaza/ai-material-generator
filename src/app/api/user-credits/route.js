// app/api/user-credits/route.js
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate email parameter
    if (!email) {
      console.warn('Missing email parameter in request');
      return NextResponse.json(
        { message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching credits for user: ${email}`);

    // Query the database for the user's credits
    const user = await db
      .select({ credits: USER_TABLE.credits })
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email))
      .limit(1);

    if (!user.length) {
      console.warn(`No user found with email: ${email}`);
      return NextResponse.json(
        { message: 'User not found', credits: 0 },
        { status: 404 }
      );
    }

    console.log(`Credits fetched successfully: ${user[0].credits}`);

    return NextResponse.json({
      credits: user[0].credits,
      message: 'Credits fetched successfully',
    });
  } catch (error) {
    console.error('Error in GET /api/user-credits:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
