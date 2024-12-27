import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { RefreshCcw, Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { cn } from '../../../lib/utils';

function CourseCardItem({ course }) {
  const formattedDate = new Date('2024-12-20').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:ring-1 hover:ring-purple-500/20">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="relative w-12 h-12 mb-3">
            <Image
              src="/study.svg"
              alt="Course Icon"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h2 className="font-semibold text-xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 truncate mb-2">
          {course?.courseLayout?.courseTitle}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300 mb-4">
          {course?.courseLayout?.courseSummary}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Progress</span>
            <span>0%</span>
          </div>
          <Progress value={0} className="h-1.5 bg-gray-100 dark:bg-gray-700" />
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        {course?.status === 'Generating' ? (
          <div className="w-full flex justify-end">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <RefreshCcw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Generating...</span>
            </div>
          </div>
        ) : (
          <Link
            href={`/course/${course?.courseId}`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-full bg-white dark:bg-gray-800 border-purple-500/20 hover:border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300',
              'group/button flex items-center justify-center space-x-2'
            )}
          >
            <span>View Course</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default CourseCardItem;
