import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
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
    clearTextarea(); // Reset topic in parent
  };

  return (
    <div className="mt-10 w-full flex flex-col">
      <h2>
        Enter topic or paste the content for which you want to generate study
        material
      </h2>
      <Textarea
        placeholder="Start writing here"
        className="mt-2"
        value={currentTopic}
        onChange={(event) => {
          const value = event.target.value;
          setCurrentTopic(value);
          setTopic(value); // Pass value to parent
        }}
      />
      <button
        className="mt-2 text-sm text-red-500 underline self-start"
        onClick={handleClear}
      >
        Clear Topic
      </button>

      <h2 className="mt-5 mb-3">Select the difficulty Level</h2>
      <Select
        value={currentDifficulty}
        onValueChange={(value) => {
          setCurrentDifficulty(value);
          setDifficultyLevel(value); // Pass value to parent
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Difficulty Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Moderate">Moderate</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default TopicInput;
