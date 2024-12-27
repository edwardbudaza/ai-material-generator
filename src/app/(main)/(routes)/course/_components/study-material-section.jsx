// StudyMaterialSection.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import MaterialCardItem from './material-card-item';

// Study material types configuration
const materialList = [
  {
    name: 'Notes/Chapters',
    desc: 'Prepare with detailed notes and comprehensive chapters.',
    icon: '/notes.svg',
    path: '/notes',
    type: 'notes',
  },
  {
    name: 'Flashcards',
    desc: 'Reinforce concepts and boost memory using flashcards.',
    icon: '/flashcard.png',
    path: '/flashcards',
    type: 'flashcard',
  },
  {
    name: 'Quiz',
    desc: 'Evaluate your knowledge with fun and engaging quizzes.',
    icon: '/quiz.svg',
    path: '/quiz',
    type: 'quiz',
  },
  {
    name: 'Question/Answer',
    desc: 'Strengthen your skills through interactive Q&A sessions.',
    icon: '/qa.svg',
    path: '/qa',
    type: 'qa',
  },
];

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudyMaterial = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: 'ALL',
      });
      setStudyTypeContent(result?.data || {});
    } catch (error) {
      console.error('Error fetching study material:', error);
      setError('Failed to load study materials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudyMaterial();
  }, [courseId]);

  if (loading) {
    return (
      <section className="mt-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="font-bold text-2xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
        Study Material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {materialList.map((item) => (
          <MaterialCardItem
            key={item.type}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={fetchStudyMaterial}
          />
        ))}
      </div>
    </section>
  );
}

export default StudyMaterialSection;
