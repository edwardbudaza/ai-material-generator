import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);

  // Check if the study type content for this item is ready
  const isReady = Boolean(studyTypeContent?.[item.type]);

  const generateContent = async () => {
    if (!course?.courseLayout?.chapters?.length) {
      console.error('Course layout or chapters are missing.');
      return;
    }

    setLoading(true);

    try {
      const chapters = course.courseLayout.chapters
        .map((chapter) => chapter.name)
        .join(',');

      // Trigger API to generate content
      await axios.post('/api/study-type-content', {
        courseId: course.courseId,
        type: item.type,
        chapters,
      });

      console.log(`Content generation triggered for ${item.type}`);

      // Refresh the parent data after generation
      await refreshData();
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'border shadow-md rounded-lg p-5 flex flex-col items-center bg-white dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105',
        !isReady && 'grayscale opacity-75'
      )}
    >
      <span
        className={cn(
          'p-1 px-2 rounded-full text-[10px] font-medium mb-2',
          isReady ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
        )}
      >
        {isReady ? 'Ready' : 'Generate'}
      </span>

      <Image
        src={item.icon}
        alt={item.name}
        width={50}
        height={50}
        className="rounded-lg"
      />

      <h3 className="font-medium mt-3 text-gray-900 dark:text-white text-center">
        {item.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
        {item.desc || 'No description available.'}
      </p>

      {isReady ? (
        <Button asChild className="mt-3 w-full" variant="outline">
          <Link href={`/course/${course?.courseId}${item.path}`}>View</Link>
        </Button>
      ) : (
        <Button
          className="mt-3 w-full"
          variant="outline"
          onClick={generateContent}
          disabled={loading}
        >
          {loading ? (
            <>
              <RefreshCcw className="animate-spin" /> Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      )}
    </div>
  );
}

export default MaterialCardItem;
