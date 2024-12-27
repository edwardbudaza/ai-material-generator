// ./_components/flashcard-item.jsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

const FlashcardItem = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyPress = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsFlipped((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div
      className="relative group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card
          className="relative w-full h-96 cursor-pointer transition-all duration-500 
                     transform hover:scale-[1.02] hover:shadow-xl"
          onClick={() => setIsFlipped(true)}
        >
          <CardContent className="h-full p-6 flex flex-col items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 
                          dark:from-violet-500/20 dark:via-purple-500/20 dark:to-fuchsia-500/20 rounded-lg"
            />
            <div className="relative z-10 text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
              {front}
            </div>
            <div
              className="absolute bottom-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                          transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              <RotateCw className="w-4 h-4" />
              Click or press Space to reveal
            </div>
          </CardContent>
        </Card>

        <Card
          className="relative w-full h-96 cursor-pointer transition-all duration-500 
                     transform hover:scale-[1.02] hover:shadow-xl"
          onClick={() => setIsFlipped(false)}
        >
          <CardContent className="h-full p-6 flex flex-col items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-violet-500/10 
                          dark:from-fuchsia-500/20 dark:via-purple-500/20 dark:to-violet-500/20 rounded-lg"
            />
            <div className="relative z-10 text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
              {back}
            </div>
            <div
              className="absolute bottom-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400
                          transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            >
              <RotateCw className="w-4 h-4" />
              Click or press Space to flip back
            </div>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </div>
  );
};

export default FlashcardItem;
