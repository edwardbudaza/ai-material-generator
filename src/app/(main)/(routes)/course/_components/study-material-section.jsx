import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialCardItem from './material-card-item';

function StudyMaterialSection({ courseId, course }) {
  const [studyTypeContent, setStudyTypeContent] = useState(null);

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

  useEffect(() => {
    fetchStudyMaterial();
  }, []);

  const fetchStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId,
        studyType: 'ALL',
      });

      // Update the state with the fetched data
      setStudyTypeContent(result?.data || {});
      console.log('This is the study type content: ', result);
    } catch (error) {
      console.error('Error fetching study material:', error);
    }
  };

  return (
    <section className="mt-5">
      <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
        Study Material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {materialList.map((item) => (
          <MaterialCardItem
            key={item.type}
            item={item}
            studyTypeContent={studyTypeContent}
            course={course}
            refreshData={fetchStudyMaterial} // Pass refresh function
          />
        ))}
      </div>
    </section>
  );
}

export default StudyMaterialSection;
