import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@components/AdminSidebar';
import { TopNavbar } from '@components/TopNavbar';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />
      <div className="flex-1 bg-slate-950">
        <TopNavbar />
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
