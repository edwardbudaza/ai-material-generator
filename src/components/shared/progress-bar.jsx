// components/shared/progress-bar.jsx
'use client';

import { cn } from '@/lib/utils';

export function ProgressBar({ currentStep, total }) {
  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          {currentStep + 1} of {total}
        </span>
        <span>{Math.round(((currentStep + 1) / total) * 100)}% Complete</span>
      </div>
      <div className="flex justify-between w-full gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-500',
              i <= currentStep
                ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 scale-y-125'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>
    </div>
  );
}
