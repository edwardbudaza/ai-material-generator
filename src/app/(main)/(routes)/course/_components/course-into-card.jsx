import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

function CourseIntroCard({ course }) {
  if (!course) {
    return (
      <div className="flex gap-5 items-center p-10 border shadow-md rounded-lg animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-[70px] h-[70px]" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-5 items-center p-10 border shadow-md rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <Image src="/study.svg" alt="Course Icon" width={70} height={70} />
      <div>
        <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
          {course.courseLayout?.courseTitle || 'Course Title'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {course.courseLayout?.courseSummary || 'Course Summary'}
        </p>
        <Progress className="mt-3" value={course.progress || 0} />
        <h2 className="mt-3 text-lg text-primary">
          Total Chapter(s): {course.courseLayout?.chapters?.length || 0}
        </h2>
      </div>
    </div>
  );
}

export default CourseIntroCard;
