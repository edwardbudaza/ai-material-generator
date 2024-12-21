import React from 'react';

function ChapterList({ course }) {
  const chapters = course?.courseLayout?.chapters;

  if (!chapters || chapters.length === 0) {
    return (
      <div className="mt-5 text-center">
        <h2 className="font-medium text-xl text-gray-600 dark:text-gray-300">
          No Chapters Available
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl text-gray-900 dark:text-gray-100">
        Chapters
      </h2>
      <div className="mt-3 space-y-3">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg transition-transform transform hover:scale-105"
          >
            <h2
              className="text-3xl"
              aria-label={`Emoji for ${chapter?.name || 'Chapter'}`}
            >
              {chapter?.emoji || '📖'}
            </h2>
            <div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
                {chapter?.name || 'Untitled Chapter'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chapter?.summary || 'No summary available.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
