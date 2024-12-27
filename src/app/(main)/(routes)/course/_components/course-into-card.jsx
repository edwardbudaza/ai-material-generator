// CourseIntroCard.jsx
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

function CourseIntroCard({ course, loading }) {
  if (loading || !course) {
    return (
      <Card className="w-full animate-pulse">
        <CardContent className="p-6 flex gap-5 items-center">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-[70px] h-[70px]" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 flex gap-5 items-center">
        <Image
          src="/study.svg"
          alt="Course Icon"
          width={70}
          height={70}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
            {course.courseLayout?.courseTitle || 'Course Title'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {course.courseLayout?.courseSummary || 'Course Summary'}
          </p>
          <Progress
            value={course.progress || 0}
            className="mt-4 bg-gray-200 dark:bg-gray-700"
          />
          <div className="mt-3 flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">
              {course.courseLayout?.chapters?.length || 0} Chapter(s)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseIntroCard;
