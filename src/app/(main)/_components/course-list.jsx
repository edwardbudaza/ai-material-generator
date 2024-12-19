'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CourseCardItem from './course-card-item';
function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (user) {
      GetCourseList();
    }
  }, [user]);

  const GetCourseList = async () => {
    try {
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress, // Passing the createdBy value
      });

      console.log(result);
      setCourseList(result.data.result);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Your Study Material</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {courseList?.map((course, index) => (
          <CourseCardItem course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
