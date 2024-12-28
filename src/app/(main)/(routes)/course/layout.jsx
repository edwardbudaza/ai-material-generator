// app/(main)/(routes)/course/[courseId]/layout.jsx

import DashboardHeader from '../../_components/dashboard-header';

function CourseLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center px-4 h-16">
            <DashboardHeader />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default CourseLayout;
