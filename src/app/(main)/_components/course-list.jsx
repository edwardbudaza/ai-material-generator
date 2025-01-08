'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import CourseCardItem from './course-card-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCcw, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CourseCountContext } from '@/context/course-count-context';

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    if (user) {
      fetchCourseList();
    }
  }, [user]);

  const fetchCourseList = async () => {
    try {
      if (!refreshing) setLoading(true);
      setError(null);
      const email = user?.primaryEmailAddress?.emailAddress;
      const result = await axios.get(`/api/courses?email=${email}`);
      setCourseList(result.data.result);
      setTotalCourse(result.data.result?.length);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCourseList();
  };

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button
            onClick={handleRefresh}
            className="mt-4 inline-flex items-center space-x-2"
            variant="destructive"
          >
            <RefreshCcw className={refreshing ? 'animate-spin' : ''} />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <CardContent className="p-0">
                <div className="h-56 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
          Your Study Material
        </h2>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center space-x-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          disabled={refreshing}
        >
          <RefreshCcw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </Button>
      </div>

      {courseList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseList.map((course, index) => (
            <CourseCardItem course={course} key={index} />
          ))}
        </div>
      ) : (
        <Card className="w-full">
          <CardContent className="p-12">
            <div className="text-center space-y-4">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                No Courses Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your course list is empty. Create your first course to get
                started.
              </p>
              <Button
                onClick={handleRefresh}
                variant="outline"
                className="mt-4 inline-flex items-center space-x-2"
              >
                <RefreshCcw className={refreshing ? 'animate-spin' : ''} />
                <span>Refresh List</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CourseList;
