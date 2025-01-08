// api/create-user/route.js
import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { user } = await req.json();

    // Simplified validation for required fields
    const email = user?.primaryEmailAddress?.emailAddress;
    const fullName = user?.fullName;

    if (!email || !fullName) {
      return NextResponse.json(
        { error: 'Missing required user fields: email and fullName' },
        { status: 400 }
      );
    }

    // Send event to Inngest
    const result = await inngest.send({
      name: 'user.create',
      data: {
        user: {
          email,
          fullName,
        },
      },
    });

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error('Error in user creation:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
