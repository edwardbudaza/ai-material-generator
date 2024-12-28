'use client';

import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

function ProgressBar({ currentStep, total }) {
  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
        <span>
          Question {currentStep + 1} of {total}
        </span>
        <span>{Math.round(((currentStep + 1) / total) * 100)}% Complete</span>
      </div>
      <div className="flex justify-between w-full gap-2">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-500',
              i <= currentStep
                ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 scale-y-125'
                : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>
    </div>
  );
}

function QuizPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const result = await axios.post('/api/study-type', {
          courseId: courseId,
          studyType: 'quiz',
        });
        console.log('Quiz Data', result.data[1]);
        const quizQuestions = result.data[1]?.content[0]?.questions || [];
        setQuestions(quizQuestions);
      } catch (err) {
        setError('Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchQuiz();
    }
  }, [courseId]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    setIsCorrect(answer === currentQuestion.correctAnswer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center space-x-2"
          >
            <RotateCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-xl">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600 dark:text-gray-400">
              No quiz questions available for this course.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
          Quiz Time
        </h1>

        <ProgressBar
          currentStep={currentQuestionIndex}
          total={questions.length}
        />

        <Card className="w-full mb-16">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={cn(
                    'w-full p-4 text-left rounded-lg transition-all duration-200',
                    'border-2 hover:border-purple-500',
                    selectedAnswer === option
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  )}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswer && (
              <div
                className={cn(
                  'mt-6 p-4 rounded-lg',
                  isCorrect
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                )}
              >
                {isCorrect ? (
                  <p>Correct! Well done!</p>
                ) : (
                  <p>
                    Incorrect. The correct answer is:{' '}
                    {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevious}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={!selectedAnswer}
                onClick={handleNext}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
