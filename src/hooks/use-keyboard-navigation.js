// hooks/use-keyboard-navigation.js
'use client';

import { useEffect } from 'react';

export function useKeyboardNavigation(
  currentStep,
  totalSteps,
  onNext,
  onPrevious
) {
  useEffect(() => {
    const handleKeyNavigation = (e) => {
      if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) {
        onNext();
      } else if (e.key === 'ArrowLeft' && currentStep > 0) {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [currentStep, totalSteps, onNext, onPrevious]);
}
