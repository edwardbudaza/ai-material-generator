'use client';

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft, RotateCw } from 'lucide-react';

// API service
const notesService = {
  async getNotes(courseId) {
    try {
      const response = await axios.post('/api/study-type', {
        courseId,
        studyType: 'notes',
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },
};

function ProgressBar({ currentStep, total }) {
  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Note {currentStep + 1} of {total}
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

function CourseNotesPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await notesService.getNotes(courseId);
        setNotes(fetchedNotes);
        setStepCount(0);
      } catch (err) {
        setError('Failed to load notes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadNotes();
    }
  }, [courseId]);

  const handleNext = () => {
    if (stepCount < notes.length - 1) {
      setStepCount(stepCount + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowRight' && stepCount < notes.length - 1) {
      handleNext();
    } else if (e.key === 'ArrowLeft' && stepCount > 0) {
      handlePrevious();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [stepCount, notes.length]);

  const processContent = (content) => {
    return content?.replace(/```[a-zA-Z]*\n/g, '').replace(/```$/, '') || '';
  };

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
          Loading your notes...
        </p>
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                No notes available for this course.
              </p>
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="inline-flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Course</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
          Course Notes
        </h1>

        <ProgressBar currentStep={stepCount} total={notes.length} />

        <Card className="w-full mb-16">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {notes[stepCount]?.name ?? `Note ${stepCount + 1}`}
            </h2>
            <div
              className="prose prose-gray dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: processContent(notes[stepCount]?.notes),
              }}
            />
          </CardContent>
        </Card>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                disabled={stepCount === 0}
                onClick={handlePrevious}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {stepCount >= notes.length - 1 ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Course</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-xl mx-auto">
          <h2 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
            How to use:
          </h2>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Use arrow keys or buttons to navigate between notes</li>
            <li>• Track your progress with the bar above</li>
            <li>• Content automatically scrolls to top when changing notes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseNotesPage;
