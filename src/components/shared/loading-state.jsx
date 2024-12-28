// components/shared/loading-state.jsx
'use client';
export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}
