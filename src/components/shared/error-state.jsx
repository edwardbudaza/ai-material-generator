// components/shared/error-state.jsx

'use client';

import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';

export function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{message}</p>
        <Button
          onClick={onRetry}
          className="mt-4 inline-flex items-center space-x-2"
        >
          <RotateCw className="w-4 h-4" />
          <span>Try Again</span>
        </Button>
      </div>
    </div>
  );
}
