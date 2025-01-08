import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RefreshCcw, MessagesSquare } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const isReady = Boolean(studyTypeContent?.[item.type]);
  const isQAFeature = item.type === 'qa';

  const generateContent = async () => {
    if (!course?.courseLayout?.chapters?.length) {
      toast.error('Course layout or chapters are missing.');
      return;
    }

    setLoading(true);

    try {
      const chapters = course.courseLayout.chapters
        .map((chapter) => chapter.name)
        .join(',');

      await axios.post('/api/study-type-content', {
        courseId: course.courseId,
        type: item.type,
        chapters,
      });

      toast.success(`Content generation triggered for ${item.type}.`);
      await refreshData();
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    if (isQAFeature) {
      return (
        <Button className="mt-4 w-full" disabled variant="outline">
          <div className="flex items-center gap-2">
            <MessagesSquare className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>
        </Button>
      );
    }

    if (isReady) {
      return (
        <Button
          asChild
          className="mt-4 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white hover:opacity-90"
        >
          <Link href={`/course/${course?.courseId}${item.path}`}>View</Link>
        </Button>
      );
    }

    return (
      <Button
        className="mt-4 w-full"
        variant="outline"
        onClick={generateContent}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </div>
        ) : (
          'Generate'
        )}
      </Button>
    );
  };

  return (
    <Card
      className={cn(
        'transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        !isReady && !isQAFeature && 'opacity-75'
      )}
    >
      <CardContent className="p-6 flex flex-col items-center">
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium mb-4',
            isQAFeature
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              : isReady
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          )}
        >
          {isQAFeature ? 'Coming Soon' : isReady ? 'Ready' : 'Generate'}
        </span>

        <div className="p-3 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 rounded-lg">
          <Image
            src={item.icon}
            alt={item.name}
            width={50}
            height={50}
            className="rounded-lg"
          />
        </div>

        <h3 className="font-medium mt-4 text-gray-900 dark:text-white text-center">
          {item.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
          {item.desc || 'No description available.'}
        </p>

        {renderButton()}
      </CardContent>
    </Card>
  );
}

export default MaterialCardItem;
