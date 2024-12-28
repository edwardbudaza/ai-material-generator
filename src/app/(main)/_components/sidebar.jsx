'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Shield,
  UserCircle,
  Plus,
  Sparkles,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fakeCredits = await new Promise((resolve) =>
          setTimeout(() => resolve(5), 2000)
        );
        setCredits(fakeCredits);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const MenuList = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile',
    },
  ];

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

        <nav className="mt-6 space-y-2">
          {MenuList.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all duration-300',
                path === menu.path
                  ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-md shadow-purple-500/20'
                  : 'hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
              )}
            >
              <menu.icon
                className={cn(
                  'w-5 h-5 transition-transform duration-300',
                  path === menu.path ? 'rotate-0' : 'group-hover:rotate-3'
                )}
              />
              <span className="font-medium">{menu.name}</span>
            </Link>
          ))}
        </nav>
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

            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <Progress value={0} className="h-1.5" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                  {credits || 0} Credits
                </p>
                <Progress
                  value={credits ? (credits - 1) * 20 : 0}
                  className="h-1.5 bg-gray-200 dark:bg-gray-700"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 out of {credits} Credits used
                </p>
                <Link
                  href="/dashboard/upgrade"
                  className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Upgrade to get more credits
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
