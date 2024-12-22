import axios from 'axios';
import MaterialCardItem from './material-card-item';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function StudyMaterialSection({ courseId }) {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
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
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    const result = await axios.post('/api/study-type', {
      courseId: courseId,
      studyType: 'ALL',
    });

    console.log(result?.data);
    setStudyTypeContent(result?.data);
  };

  return (
    <section className="mt-5">
      <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
        Study Material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {MaterialList.map((item, index) => (
          <Link href={`/course/${courseId}${item.path}`} key={index}>
            <MaterialCardItem item={item} studyTypeContent={studyTypeContent} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default StudyMaterialSection;
