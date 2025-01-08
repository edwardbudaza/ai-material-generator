'use client';

import { useState, useContext, useEffect } from 'react';
import { Menu, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MenuList } from './menu-list';
import { useCredits } from '@/hooks/use-credits';
import { CourseCountContext } from '@/context/course-count-context';
import { usePathname } from 'next/navigation';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { credits, isLoading } = useCredits();
  const { totalCourse } = useContext(CourseCountContext);
  const pathname = usePathname();

  // Close sheet when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
            <SheetTitle className="flex items-center gap-2">
              <div className="relative w-8 h-8">
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
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                Learn Mate
              </span>
            </SheetTitle>
          </SheetHeader>

          {/* Menu Content */}
          <div className="flex-1 px-4 py-6">
            <Link href="/create-course">
              <Button className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white hover:opacity-90 transition-all duration-300 group">
                <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                Create New
              </Button>
            </Link>

            <div className="mt-6">
              <MenuList credits={credits} onClick={() => setIsOpen(false)} />
            </div>
          </div>

          {/* Credits Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
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
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
