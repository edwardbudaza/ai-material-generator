import Sidebar from '../../_components/sidebar';
import DashboardHeader from '../../_components/dashboard-header';

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
export default DashboardLayout;
