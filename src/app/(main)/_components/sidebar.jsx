'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import Link from 'next/link';

function Sidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState(null);
  const path = usePathname();

  useEffect(() => {
    // Simulating an API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
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
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md flex flex-col justify-between">
      {/* Logo Section */}
      <div className="flex gap-3 items-center justify-center mt-6">
        <Image
          src="/logo.svg"
          height="40"
          width="40"
          alt="Logo"
          className="dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          height="40"
          width="40"
          alt="Logo"
          className="hidden dark:block"
        />
        <h2 className="font-bold text-2xl">Learn Mate</h2>
      </div>

      {/* Menu Section */}
      <div className="mt-10 flex-1 px-4">
        <Link href="/create-course">
          <Button className="w-full py-2 bg-primary hover:bg-primary-dark text-white">
            + Create New
          </Button>
        </Link>

        <nav className="mt-6 space-y-2">
          {MenuList.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className={cn(
                'flex gap-4 items-center p-3 rounded-lg transition-colors',
                path === menu.path
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800'
              )}
            >
              <menu.icon className="h-5 w-5" />
              <span className="font-medium">{menu.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Credits Section */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mx-4 mb-6">
        <h2 className="text-lg font-medium mb-2">Available Credits:</h2>

        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20 mb-2"></div>
            <Progress value={0} className="mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-36"></div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-medium mb-2">
              {credits || 0} Credits Remaining
            </h2>
            <Progress
              value={credits ? (credits - 1) * 20 : 0}
              className="mb-2"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1 out of {credits} Credits used
            </p>
          </>
        )}

        <Link
          href={'/dashboard/upgrade'}
          className="block text-primary hover:underline text-sm mt-3"
        >
          Upgrade to create more
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
