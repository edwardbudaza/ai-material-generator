// app/payment-error/page.jsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentError() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                Payment Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn't process your payment. Please try again or contact
                support if the problem persists.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => router.back()}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:opacity-90"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Try Again</span>
              </Button>
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <Home className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
