'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../../_components/dashboard-header';
import CourseIntroCard from '../_components/course-into-card';
import StudyMaterialSection from '../_components/study-material-section';
import ChapterList from '../_components/chapter-list';

function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourse(result.data.result);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <DashboardHeader />

      <div className="mx-10 md:mx-36 lg:mx-60 mt-10">
        {/* Course Intro */}
        {loading ? (
          <CourseIntroCard course={null} />
        ) : (
          <CourseIntroCard course={course} />
        )}

        {/* Study Material Section */}
        <StudyMaterialSection />

        {/* Chapter List Here */}
        <ChapterList course={course} />
      </div>
    </div>
  );
}

export default CoursePage;
