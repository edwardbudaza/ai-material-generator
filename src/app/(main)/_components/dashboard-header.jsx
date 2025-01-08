'use client';

import { useState, useEffect } from 'react';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { ModeToggle } from '@/components/global/mode-toggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Home, ChevronRight, Loader } from 'lucide-react';

const DashboardHeader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Convert pathname to breadcrumb
  const getBreadcrumb = () => {
    if (!pathname) return '';
    const paths = pathname.split('/').filter(Boolean);
    return paths[paths.length - 1]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
        <Link
          href="/dashboard"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Home className="h-4 w-4" />
        </Link>
        {pathname !== '/dashboard' && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium">{getBreadcrumb()}</span>
          </>
        )}
      </div>

      {/* Right side - User controls */}
      <div className="flex items-center gap-4">
        <ClerkLoading>
          <Loader className="h-8 w-8 animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8',
              },
            }}
          />
        </ClerkLoaded>
        <ModeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
