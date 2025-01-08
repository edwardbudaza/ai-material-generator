'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SelectOption from '../../_components/select-option';
import TopicInput from '../../_components/topic-input';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const initialFormData = {
  studyType: '',
  topic: '',
  difficulty: '',
};

const initialErrorState = {
  studyType: false,
  topic: false,
  difficulty: false,
};

const validateFormData = (step, formData) => {
  const errors = {};
  if (step === 0 && !formData.studyType) errors.studyType = true;
  if (step === 1) {
    if (!formData.topic) errors.topic = true;
    if (!formData.difficulty) errors.difficulty = true;
  }
  return errors;
};

function CreateCoursePage() {
  const [step, setStep] = useState(0);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrorState);

  const router = useRouter();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: false,
      }));
    }
  };

  const handleNext = () => {
    const validationErrors = validateFormData(step, formData);
    if (Object.keys(validationErrors).length === 0) {
      setStep((prev) => prev + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrevious = () => setStep((prev) => Math.max(0, prev - 1));

  const generateCourseOutline = async () => {
    setLoading(true);
    try {
      const courseId = uuidv4();
      const email = user?.primaryEmailAddress?.emailAddress;

      if (!email) {
        throw new Error('User email not found');
      }

      // First check if user has enough credits
      const creditsResponse = await axios.get(
        `/api/user-credits?email=${email}`
      );
      const credits = creditsResponse.data.credits;

      if (credits < 1) {
        toast.error(
          'Insufficient credits. Please purchase more credits to continue.'
        );
        router.push('/pricing');
        return;
      }

      // Start course generation
      const response = await axios.post('/api/generate-course-outline', {
        courseId,
        courseType: formData.studyType,
        topic: formData.topic,
        difficultyLevel: formData.difficulty,
        createdBy: email,
      });

      // Deduct credit only if course generation started successfully
      await axios.post('/api/deduct-credit', { email });

      toast.success('Course generation started successfully');
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to start course generation'
      );
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-16">
      {/* Existing JSX */}

      <h2 className="font-bold text-3xl lg:text-4xl text-indigo-600 dark:text-indigo-400 text-center">
        Build Your Personalized Study Material
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-lg text-center mt-2">
        Complete the steps below to generate study materials tailored to your
        needs.
      </p>

      <div className="mt-10 w-full">
        {step === 0 && (
          <SelectOption
            selectedStudyType={(value) => updateFormData('studyType', value)}
            preSelected={formData.studyType}
          />
        )}
        {step === 1 && (
          <TopicInput
            setTopic={(value) => updateFormData('topic', value)}
            setDifficultyLevel={(value) => updateFormData('difficulty', value)}
            topic={formData.topic}
            difficulty={formData.difficulty}
          />
        )}
        {step === 2 && (
          <div className="flex flex-col items-center text-center">
            <h3 className="font-semibold text-xl lg:text-2xl text-indigo-500 dark:text-indigo-400">
              Step 3: Review & Generate
            </h3>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-xl mt-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Study Type:</strong>{' '}
                {formData.studyType || 'Not Selected'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Topic:</strong> {formData.topic || 'Not Entered'}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                <strong>Difficulty:</strong>{' '}
                {formData.difficulty || 'Not Selected'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center w-full mt-16">
        {step > 0 && (
          <Button
            variant="outline"
            className="px-6 py-2"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}
        <span className="block"></span>{' '}
        {/* Empty span for aligning the Next button */}
        {step < 2 ? (
          <Button
            className="px-6 py-2"
            onClick={handleNext}
            disabled={Boolean(
              Object.keys(validateFormData(step, formData)).length
            )}
          >
            Next
          </Button>
        ) : (
          <Button
            className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600"
            onClick={generateCourseOutline}
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin size-6" /> : 'Generate'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreateCoursePage;
