'use client';

import Sidebar from '../../_components/sidebar';
import DashboardHeader from '../../_components/dashboard-header';
import MobileNav from '../../_components/mobile-nav';
import { CourseCountContext } from '@/context/course-count-context';
import { CreditContext } from '@/context/credit-context';
import { useState } from 'react';

function DashboardLayout({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);
  const [credits, setCredits] = useState(null);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <CreditContext.Provider value={{ credits, setCredits }}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Desktop Sidebar */}
          <div className="hidden md:block fixed inset-y-0 left-0 z-20">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="md:ml-64 flex flex-col min-h-screen">
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center px-4 h-16">
                <MobileNav />
                <DashboardHeader />
              </div>
            </header>

            <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
          </div>
        </div>
      </CreditContext.Provider>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;
