// ./flashcards-page.jsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import FlashcardItem from './_components/flashcard-item';
import FlashcardProgressBar from './_components/flashcard-progress-bar';

// API service
const flashcardService = {
  async getFlashcards(courseId) {
    try {
      const response = await axios.post('/api/study-type', {
        courseId,
        studyType: 'flashcard',
      });
      return response.data[0]?.content || [];
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  },
};

function FlashcardsPage() {
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

  const handleKeyNavigation = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (
        e.key === 'ArrowRight' &&
        currentIndex < flashcards.length - 1
      ) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, flashcards.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => router.refresh()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">
          Loading your flashcards...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
        Flashcards: Test Your Knowledge
      </h1>

      {flashcards.length > 0 ? (
        <div className="w-full max-w-4xl flex flex-col items-center">
          <FlashcardProgressBar
            currentIndex={currentIndex}
            total={flashcards.length}
          />

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
                    <FlashcardItem front={card.front} back={card.back} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {currentIndex > 0 && (
                <CarouselPrevious
                  className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2"
                  variant="outline"
                  onClick={() =>
                    setCurrentIndex((prev) => Math.max(0, prev - 1))
                  }
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
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            No flashcards available for this course.
          </p>
        </div>
      )}
    </div>
  );
}

export default FlashcardsPage;
