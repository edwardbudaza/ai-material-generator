// ./_components/flashcard-progress-bar.jsx
const FlashcardProgressBar = ({ currentIndex, total }) => {
  return (
    <div className="w-full max-w-xl mb-8">
      <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Card {currentIndex + 1} of {total}
        </span>
        <span>{Math.round(((currentIndex + 1) / total) * 100)}% Complete</span>
      </div>
      <div className="flex justify-between w-full gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= currentIndex
                ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 scale-y-125'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashcardProgressBar;
