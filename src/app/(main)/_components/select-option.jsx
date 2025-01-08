import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function SelectOption({ selectedStudyType, preSelected }) {
  const [selectedOption, setSelectedOption] = useState(preSelected || '');

  useEffect(() => {
    if (preSelected) {
      setSelectedOption(preSelected);
    }
  }, [preSelected]);

  const handleSelect = (value) => {
    setSelectedOption(value);
    selectedStudyType(value);
  };

  const options = [
    { name: 'Exam Preparation', icon: '/exam_1.svg' },
    { name: 'Job Interview Prep', icon: '/job.svg' },
    { name: 'Skill Practice', icon: '/practice.svg' },
    { name: 'Coding Prep', icon: '/code.svg' },
    { name: 'Other Topics', icon: '/Knowledge.svg' },
  ];

  return (
    <Card className="border-purple-500/20">
      <CardContent className="p-8">
        <h2 className="text-center mb-8 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
          What would you like to create personalized study material for?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {options.map((option) => (
            <div
              key={option.name}
              onClick={() => handleSelect(option.name)}
              className={cn(
                'relative group p-6 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300',
                'hover:shadow-lg hover:shadow-purple-500/10',
                'border border-transparent',
                selectedOption === option.name
                  ? 'bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10'
                  : 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
                'before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:duration-300',
                selectedOption === option.name
                  ? 'before:bg-gradient-to-br before:from-violet-500 before:via-purple-500 before:to-fuchsia-500 before:opacity-20 before:blur-sm'
                  : 'before:opacity-0'
              )}
              aria-selected={selectedOption === option.name}
            >
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                <div className="relative w-12 h-12 mb-4">
                  <Image
                    src={option.icon}
                    alt={`${option.name} Icon`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3
                  className={cn(
                    'text-sm font-medium text-center transition-colors duration-300',
                    selectedOption === option.name
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {option.name}
                </h3>
              </div>

              {selectedOption === option.name && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500/30 transition-all duration-300" />
              )}
            </div>
          ))}
        </div>

        {selectedOption && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You selected:{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                {selectedOption}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SelectOption;
