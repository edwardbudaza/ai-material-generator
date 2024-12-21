import MaterialCardItem from './material-card-item';

function StudyMaterialSection() {
  const MaterialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Prepare with detailed notes and comprehensive chapters.',
      icon: '/notes.svg',
      path: '/notes',
    },
    {
      name: 'Flashcards',
      desc: 'Reinforce concepts and boost memory using flashcards.',
      icon: '/flashcard.png',
      path: '/flashcards',
    },
    {
      name: 'Quiz',
      desc: 'Evaluate your knowledge with fun and engaging quizzes.',
      icon: '/quiz.svg',
      path: '/quiz',
    },
    {
      name: 'Q&A',
      desc: 'Strengthen your skills through interactive Q&A sessions.',
      icon: '/qa.svg',
      path: '/qa',
    },
  ];

  return (
    <section className="mt-5">
      <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
        Study Material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {MaterialList.map((item, index) => (
          <MaterialCardItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default StudyMaterialSection;
