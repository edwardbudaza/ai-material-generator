import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, BookOpen, Gauge } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function TopicInput({
  setTopic,
  setDifficultyLevel,
  topic,
  difficulty,
  clearTextarea,
}) {
  const [currentTopic, setCurrentTopic] = useState(topic || '');
  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty || '');

  useEffect(() => {
    if (topic) setCurrentTopic(topic);
    if (difficulty) setCurrentDifficulty(difficulty);
  }, [topic, difficulty]);

  const handleClear = () => {
    setCurrentTopic('');
    clearTextarea();
  };

  return (
    <Card className="w-full border-purple-500/20">
      <CardContent className="p-6 space-y-6">
        {/* Topic Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Study Topic or Content
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter the topic or paste the content for which you want to generate
            study material
          </p>
          <div className="relative">
            <Textarea
              placeholder="Start writing here..."
              className="min-h-[120px] border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/30 resize-none"
              value={currentTopic}
              onChange={(event) => {
                const value = event.target.value;
                setCurrentTopic(value);
                setTopic(value);
              }}
            />
            {currentTopic && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute bottom-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Difficulty Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-purple-500" />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Difficulty Level
            </h2>
          </div>
          <Select
            value={currentDifficulty}
            onValueChange={(value) => {
              setCurrentDifficulty(value);
              setDifficultyLevel(value);
            }}
          >
            <SelectTrigger className="w-full border-purple-500/20 focus:ring-purple-500/30">
              <SelectValue placeholder="Choose difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy" className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Easy</span>
              </SelectItem>
              <SelectItem
                value="Moderate"
                className="flex items-center space-x-2"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Moderate</span>
              </SelectItem>
              <SelectItem value="Hard" className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Hard</span>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select the appropriate difficulty level for your study material
          </p>
        </div>

        {/* Visual Feedback */}
        {currentTopic && currentDifficulty && (
          <div className="pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generating material for:{' '}
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                {currentTopic.slice(0, 50)}
                {currentTopic.length > 50 ? '...' : ''} ({currentDifficulty})
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TopicInput;
