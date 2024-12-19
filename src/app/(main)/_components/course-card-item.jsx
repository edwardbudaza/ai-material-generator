import Image from 'next/image';
import { Progress } from '../../../components/ui/progress';
import { Button } from '../../../components/ui/button';
import { RefreshCcw } from 'lucide-react';

function CourseCardItem({ course }) {
  return (
    <div className="border rounded-lg shadow-md p-5 bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src={'/study.svg'} alt="Course Icon" width={50} height={50} />
          <span className="text-xs bg-gray-200 dark:bg-gray-600 p-1 px-2 rounded-full text-gray-800 dark:text-white">
            20 Dec 2024
          </span>
        </div>
      </div>

      <h2 className="mt-3 font-medium text-xl text-gray-900 dark:text-white truncate transition-colors duration-300 hover:text-primary">
        {course?.courseLayout?.courseTitle}
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 transition-colors duration-300 hover:text-gray-700 dark:hover:text-gray-300">
        {course?.courseLayout?.courseSummary}
      </p>

      <div className="mt-3">
        <Progress value={0} />
      </div>

      <div className="mt-4 flex justify-end">
        {course?.status === 'Generating' ? (
          <h2 className="flex gap-2 text-sm p-1 px-2 rounded-full bg-gray-500 text-white dark:bg-gray-700 dark:text-gray-200">
            <RefreshCcw className="size-5" />
            Generating...
          </h2>
        ) : (
          <Button>View</Button>
        )}
      </div>
    </div>
  );
}

export default CourseCardItem;
