// app/(dashboard)/courses/[courseId]/notes/page.jsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { notesService } from '../_services/notes-service';
import { LoadingState } from '@/components/shared/loading-state';
import { ErrorState } from '@/components/shared/error-state';
import { ProgressBar } from '@/components/shared/progress-bar';
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation';

function NotesPage() {
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

  useKeyboardNavigation(stepCount, notes.length, handleNext, handlePrevious);

  const processContent = (content) => {
    return content?.replace(/```[a-zA-Z]*\n/g, '').replace(/```$/, '') || '';
  };

  if (loading) return <LoadingState message="Loading your notes..." />;
  if (error)
    return <ErrorState message={error} onRetry={() => router.refresh()} />;
  if (!notes.length) {
    return (
      <Card className="w-full max-w-xl mx-auto">
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
    );
  }

  return (
    <>
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

      <NavigationControls
        currentStep={stepCount}
        totalSteps={notes.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onBack={() => router.back()}
      />

      <NotesInstructions />
    </>
  );
}
export default NotesPage;

// Extracted Navigation Controls component
function NavigationControls({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onBack,
}) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-2 flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep === 0}
            onClick={onPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep >= totalSteps - 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function NotesInstructions() {
  return (
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
  );
}
