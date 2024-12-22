'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // To navigate to the course page

function CourseNotesPage() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]); // Initialize with an empty array
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter(); // Router hook to navigate

  useEffect(() => {
    GetNotes();
  }, []);

  const GetNotes = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes',
      });

      const fetchedNotes = result?.data ?? []; // Fallback to an empty array if data is undefined
      console.log('Here are the Notes: ', fetchedNotes);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]); // Ensure notes are always a valid array, even on failure
    }
  };

  const handleNext = () => {
    if (stepCount < notes.length - 1) {
      setStepCount(stepCount + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  const handlePrevious = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
  };

  const handleBackToCourse = () => {
    // Navigate to the course page (you can adjust the path as needed)
    router.back();
  };

  // Utility function to process content and remove unwanted backticks or code block prefixes
  const processContent = (content) => {
    // Remove the code block markers (```html``` and the closing ``` marks)
    return content.replace(/```[a-zA-Z]*\n/g, '').replace(/```$/, '');
  };

  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-32 mt-10 space-y-6 pb-20">
      {/* Progress Bar */}
      <div className="flex gap-2 items-center">
        {notes.map((_, index) => (
          <div
            key={index}
            className={cn(
              'flex-1 h-2 rounded-full',
              index <= stepCount ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            )}
          ></div>
        ))}
      </div>

      {/* Note Content */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {notes.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              {notes[stepCount]?.name ?? `Note ${stepCount + 1}`}
            </h2>
            <div
              className="prose prose-gray dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: processContent(
                  notes[stepCount]?.notes ?? '<p>No content available.</p>'
                ),
              }}
            />
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No notes available. Please check back later.
          </p>
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex justify-between items-center w-full max-w-md px-4">
        <Button
          variant="outline"
          size="sm"
          disabled={stepCount === 0}
          onClick={handlePrevious}
          className="disabled:opacity-50"
        >
          Previous
        </Button>

        {/* Show the "Back to Course" button if on the last note */}
        {stepCount >= notes.length - 1 ? (
          <Button variant="outline" size="sm" onClick={handleBackToCourse}>
            Back to Course
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={stepCount >= notes.length - 1}
            onClick={handleNext}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseNotesPage;
