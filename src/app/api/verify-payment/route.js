import { config } from 'dotenv';
config({ path: '.env' });
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { PAYMENT_TRANSACTIONS_TABLE, USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = 'https://api.paystack.co';

// Handle the redirect from Paystack
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      // Redirect to error page if no reference
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment-error`
      );
    }

    // Verify the payment status from Paystack
    const response = await fetch(
      `${PAYSTACK_API}/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const verificationData = await response.json();

    if (
      !verificationData.status ||
      verificationData.data.status !== 'success'
    ) {
      // Payment failed
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment-error`
      );
    }

    // Get the transaction from our database
    const transaction = await db
      .select()
      .from(PAYMENT_TRANSACTIONS_TABLE)
      .where(eq(PAYMENT_TRANSACTIONS_TABLE.paystackReference, reference))
      .limit(1);

    if (!transaction.length) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/payment-error`
      );
    }

    // Update transaction status if not already completed
    if (transaction[0].status !== 'completed') {
      await db
        .update(PAYMENT_TRANSACTIONS_TABLE)
        .set({
          status: 'completed',
          metadata: {
            ...transaction[0].metadata,
            paystack_response: verificationData.data,
          },
        })
        .where(eq(PAYMENT_TRANSACTIONS_TABLE.id, transaction[0].id));

      // Retrieve the user's current credits before updating
      const user = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.id, transaction[0].userId))
        .limit(1);

      if (user.length) {
        // Add credits to user
        const newCredits = user[0].credits + transaction[0].credits;

        await db
          .update(USER_TABLE)
          .set({
            credits: newCredits,
            isMember: true, // Set 'ismember' to TRUE on successful purchase
          })
          .where(eq(USER_TABLE.id, transaction[0].userId));
      }
    }

    // Redirect to success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/payment-error`
    );
  }
}

// Handle Paystack webhook
export async function POST(req) {
  try {
    const body = await req.json();
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(body))
      .digest('hex');

    if (hash !== req.headers.get('x-paystack-signature')) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const { event, data } = body;

    if (event === 'charge.success') {
      const transaction = await db
        .select()
        .from(PAYMENT_TRANSACTIONS_TABLE)
        .where(eq(PAYMENT_TRANSACTIONS_TABLE.paystackReference, data.reference))
        .limit(1);

      if (!transaction.length) {
        throw new Error('Transaction not found');
      }

      // Update transaction status
      await db
        .update(PAYMENT_TRANSACTIONS_TABLE)
        .set({
          status: 'completed',
          metadata: { ...transaction[0].metadata, paystack_response: data },
        })
        .where(eq(PAYMENT_TRANSACTIONS_TABLE.id, transaction[0].id));

      // Retrieve the user's current credits before updating
      const user = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.id, transaction[0].userId))
        .limit(1);

      if (user.length) {
        // Add credits to user
        const newCredits = user[0].credits + transaction[0].credits;

        await db
          .update(USER_TABLE)
          .set({
            credits: newCredits,
            isMember: true, // Set 'ismember' to TRUE on successful purchase
          })
          .where(eq(USER_TABLE.id, transaction[0].userId));
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
