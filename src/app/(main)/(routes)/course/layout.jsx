import DashboardHeader from '../../_components/dashboard-header';

function CourseLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DashboardHeader />
      <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 py-6">
        {children}
      </main>
    </div>
  );
}

export default CourseLayout;
