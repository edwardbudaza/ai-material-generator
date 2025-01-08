// app/api/deduct-credit/route.js
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Fetch the current credits for the user
    const user = await db
      .select({ credits: USER_TABLE.credits })
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email))
      .limit(1);

    if (!user.length) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const currentCredits = user[0].credits;

    if (currentCredits <= 0) {
      return NextResponse.json(
        { message: 'Insufficient credits' },
        { status: 400 }
      );
    }

    // Deduct one credit
    const result = await db
      .update(USER_TABLE)
      .set({ credits: currentCredits - 1 })
      .where(eq(USER_TABLE.email, email))
      .returning({ newCredits: USER_TABLE.credits });

    return NextResponse.json({
      message: 'Credit deducted successfully',
      credits: result[0].newCredits,
    });
  } catch (error) {
    console.error('Error deducting credit:', error);
    return NextResponse.json(
      { message: 'Failed to deduct credit', details: error.message },
      { status: 500 }
    );
  }
}
