'use client';

import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Shield,
  UserCircle,
  Plus,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '../../../lib/utils';
import { MenuList } from './menu-list'; // Import the MenuList component
import { useCredits } from '@/hooks/use-credits'; // Import the useCredits hook
import { CourseCountContext } from '@/context/course-count-context';

function Sidebar() {
  const { credits, isLoading } = useCredits(); // Fetch credits from the hook
  const { totalCourse } = useContext(CourseCountContext);
  const [menuItems, setMenuItems] = useState([
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Credits', icon: Shield, path: '/dashboard/credits' },
    { name: 'Profile', icon: UserCircle, path: '/dashboard/profile' },
  ]);

  const [isCreditsLoading, setIsCreditsLoading] = useState(isLoading);

  useEffect(() => {
    setIsCreditsLoading(isLoading); // Set loading state for credits
  }, [isLoading]);

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="relative w-10 h-10">
          <Image
            src="/logo.svg"
            fill
            alt="Logo"
            className="object-contain dark:hidden transition-opacity"
          />
          <Image
            src="/logo-dark.svg"
            fill
            alt="Logo"
            className="object-contain hidden dark:block transition-opacity"
          />
        </div>
        <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
          Learn Mate
        </h2>
      </div>

      {/* Menu Section */}
      <div className="flex-1 px-4 py-6">
        <Link href="/create-course">
          <Button className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white hover:opacity-90 transition-all duration-300 group">
            <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
            Create New
          </Button>
        </Link>

        <MenuList credits={credits} />
      </div>

      {/* Credits Section */}
      <div className="p-4">
        <Card className="bg-gray-50 dark:bg-gray-800/50 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Credits
              </h3>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>

            {isCreditsLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <Progress value={0} className="h-1.5" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                  {credits - totalCourse || 0} Credits
                </p>
                <Progress
                  value={credits ? (credits / totalCourse) * 100 : 0}
                  className="h-1.5 bg-gray-200 dark:bg-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {totalCourse} out of {credits} Credits used
                </p>
                <Link
                  href="/dashboard/credits"
                  className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Buy more credits
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Sidebar;
