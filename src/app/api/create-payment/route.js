import { config } from 'dotenv';
// Load .env file
config({ path: '.env' });
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { PAYMENT_TRANSACTIONS_TABLE, USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = 'https://api.paystack.co';

export async function POST(req) {
  console.log('Received Payload for create payment: ', req);
  try {
    const { email, packageId, amount, credits } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get user from database using email
    const user = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email));

    if (!user.length) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Create payment transaction record
    const [transaction] = await db
      .insert(PAYMENT_TRANSACTIONS_TABLE)
      .values({
        userId: user[0].id,
        packageId,
        amount,
        credits,
        status: 'pending',
      })
      .returning();

    // Generate a unique reference for this transaction
    const reference = `tx_${transaction.id}_${Date.now()}`;

    // Initialize Paystack transaction
    const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        amount: Math.round(amount * 100), // Convert to smallest currency unit and ensure it's an integer
        reference: reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-payment`,
        metadata: {
          transaction_id: transaction.id,
          user_id: user[0].id,
          credits: credits,
        },
      }),
    });

    const paystackResponse = await response.json();

    if (!paystackResponse.status) {
      console.error('Paystack error:', paystackResponse);
      throw new Error(
        paystackResponse.message || 'Failed to initialize Paystack payment'
      );
    }

    // Update transaction with Paystack reference
    await db
      .update(PAYMENT_TRANSACTIONS_TABLE)
      .set({
        paystackReference: reference,
        metadata: {
          ...transaction.metadata,
          paystack_initialization: paystackResponse.data,
        },
      })
      .where(eq(PAYMENT_TRANSACTIONS_TABLE.id, transaction.id));

    return NextResponse.json({
      success: true,
      authorization_url: paystackResponse.data.authorization_url,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to initialize payment',
      },
      { status: 500 }
    );
  }
}
