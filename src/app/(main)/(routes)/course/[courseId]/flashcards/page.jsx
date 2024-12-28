// app/(dashboard)/courses/[courseId]/flashcards/page.jsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { flashcardService } from '../_services/flashcard-service';
import FlashcardItem from './_components/flashcard-item';
import { ProgressBar } from '@/components/shared/progress-bar';
import { LoadingState } from '@/components/shared/loading-state';
import { ErrorState } from '@/components/shared/error-state';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

function FlashcardPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        setLoading(true);
        const cards = await flashcardService.getFlashcards(courseId);
        setFlashcards(cards);
        setCurrentIndex(0);
      } catch (err) {
        setError('Failed to load flashcards. Please try again later.');
        console.error('Error loading flashcards:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadFlashcards();
    }
  }, [courseId]);

  const handleCarouselChange = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useKeyboardNavigation(
    currentIndex,
    flashcards.length,
    () => setCurrentIndex((prev) => Math.min(flashcards.length - 1, prev + 1)),
    () => setCurrentIndex((prev) => Math.max(0, prev - 1))
  );

  if (loading) return <LoadingState message="Loading your flashcards..." />;
  if (error)
    return <ErrorState message={error} onRetry={() => router.refresh()} />;
  if (!flashcards.length) {
    return (
      <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400">
          No flashcards available for this course.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
        Flashcards: Test Your Knowledge
      </h1>

      <div className="w-full flex flex-col items-center">
        <ProgressBar currentStep={currentIndex} total={flashcards.length} />

        <div className="relative w-full max-w-xl">
          <Carousel
            opts={{
              align: 'center',
              loop: false,
              startIndex: currentIndex,
            }}
            className="w-full"
            index={currentIndex}
            setIndex={setCurrentIndex}
          >
            <CarouselContent>
              {flashcards.map((card, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <FlashcardItem front={card?.front} back={card?.back} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {currentIndex > 0 && (
              <CarouselPrevious
                className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2"
                variant="outline"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              />
            )}
            {currentIndex < flashcards.length - 1 && (
              <CarouselNext
                className="absolute right-[-3rem] top-1/2 transform -translate-y-1/2"
                variant="outline"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(flashcards.length - 1, prev + 1)
                  )
                }
              />
            )}
          </Carousel>
        </div>

        <Instructions />
      </div>
    </>
  );
}
export default FlashcardPage;

// Extracted Instructions component
function Instructions() {
  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-xl">
      <h2 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
        How to use:
      </h2>
      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <li>• Click card or press Space/Enter to flip</li>
        <li>• Use arrow keys or side buttons to navigate</li>
        <li>• Track your progress with the bar above</li>
        <li>• Hover over cards for additional hints</li>
      </ul>
    </div>
  );
}
