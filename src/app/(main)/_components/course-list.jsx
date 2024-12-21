'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CourseCardItem from './course-card-item';
import { Button } from '../../../components/ui/button';
import { RefreshCcw } from 'lucide-react';

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCourseList();
    }
  }, [user]);

  const fetchCourseList = async () => {
    try {
      if (!refreshing) setLoading(true); // Only set loading if not refreshing
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseList(result.data.result);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCourseList();
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
          Your Study Material
        </h2>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center gap-2 border-primary text-primary dark:border-primary dark:text-primary"
        >
          <RefreshCcw className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing' : 'Refresh'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))
          : courseList?.map((course, index) => (
              <CourseCardItem course={course} key={index} />
            ))}
      </div>

      {courseList.length === 0 && !loading && (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          No courses available. Click refresh to try again.
        </p>
      )}
    </div>
  );
}

export default CourseList;
