import { inngest } from '@/inngest/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body
    const { user } = await req.json();

    // Input Validation: Ensure 'user' object has required properties
    if (!user || !user.primaryEmailAddress?.emailAddress || !user.fullName) {
      return NextResponse.json(
        { error: 'Missing required user fields: email and fullName' },
        { status: 400 } // Bad Request
      );
    }

    // Call the Inngest API to create the user
    const result = await inngest.send({
      name: 'user.create', // Ensure this matches the function name in the Inngest backend
      data: { user },
    });

    // If Inngest response is successful
    if (result.success) {
      return NextResponse.json({ result }, { status: 200 }); // OK
    } else {
      // Handle failure response from Inngest
      return NextResponse.json(
        { error: 'Failed to create user', details: result.details },
        { status: 500 } // Internal Server Error
      );
    }
  } catch (error) {
    // Catch unexpected errors and log them
    console.error('Error in user creation:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during user creation' },
      { status: 500 } // Internal Server Error
    );
  }
}
