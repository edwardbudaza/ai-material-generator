// app/payment-success/page.js
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                Payment Successful!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your payment has been processed successfully. Your credits have
                been added to your account.
              </p>
            </div>
            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:opacity-90"
            >
              <Home className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
