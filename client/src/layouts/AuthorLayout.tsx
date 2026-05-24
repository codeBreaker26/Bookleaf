import { Outlet } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import { AuthorSidebar } from '@components/AuthorSidebar';
import { useAuth } from '@hooks/useAuth';

export function AuthorLayout() {
  const auth = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AuthorSidebar />
      <div className="flex-1 bg-slate-950">
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <UserCircle2 className="h-8 w-8 text-violet-400" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Author Portal</p>
                <p className="text-base font-semibold text-white">{auth.user?.name ?? 'BookLeaf Author'}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-sm text-slate-200">
              <span className="text-slate-400">Status:</span>
              <span className="font-semibold text-white">Connected</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
