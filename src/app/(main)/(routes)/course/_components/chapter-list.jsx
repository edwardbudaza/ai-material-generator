// ChapterList.jsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ChevronRight } from 'lucide-react';

function ChapterList({ course, loading }) {
  const chapters = course?.courseLayout?.chapters;

  if (loading) {
    return (
      <div className="mt-8 space-y-4">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full animate-pulse">
            <CardContent className="p-4 flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!chapters || chapters.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="font-medium text-xl text-gray-600 dark:text-gray-300">
            No Chapters Available
          </h2>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
        Course Chapters
      </h2>
      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <CardContent className="p-4 flex items-start gap-4">
              <div className="text-3xl p-2 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 rounded-lg">
                {chapter?.emoji || '📖'}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
                  {chapter?.name || 'Untitled Chapter'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter?.summary || 'No summary available.'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
