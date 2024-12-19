import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils'; // Assuming you have a utility for conditional classes

function SelectOption({ selectedStudyType, preSelected }) {
  const [selectedOption, setSelectedOption] = useState(preSelected || '');

  useEffect(() => {
    if (preSelected) {
      setSelectedOption(preSelected);
    }
  }, [preSelected]);

  const handleSelect = (value) => {
    setSelectedOption(value);
    selectedStudyType(value); // Pass value to parent
  };

  const options = [
    { name: 'Exam Preparation', icon: '/exam_1.svg' },
    { name: 'Job Interview Prep', icon: '/job.svg' },
    { name: 'Skill Practice', icon: '/practice.svg' },
    { name: 'Coding Prep', icon: '/code.svg' },
    { name: 'Other Topics', icon: '/Knowledge.svg' },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-center mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
        What would you like to create personalized study material for?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {options.map((option) => (
          <div
            key={option.name}
            className={cn(
              'p-4 flex flex-col items-center justify-center border rounded-lg cursor-pointer transition-colors duration-200 hover:border-indigo-500 hover:shadow-lg dark:hover:border-indigo-400',
              selectedOption === option.name
                ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-900'
                : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
            )}
            onClick={() => handleSelect(option.name)}
            aria-selected={selectedOption === option.name}
          >
            <Image
              src={option.icon}
              alt={`${option.name} Icon`}
              width={50}
              height={50}
              className="mb-3"
            />
            <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {option.name}
            </h2>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            You selected: <span className="font-bold">{selectedOption}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SelectOption;
