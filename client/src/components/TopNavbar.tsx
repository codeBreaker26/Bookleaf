import { Bell, LogOut, Search, UserCircle2 } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

export function TopNavbar() {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-slate-100">
          <UserCircle2 className="h-8 w-8 text-violet-400" />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin Portal</p>
            <p className="text-base font-semibold text-white">BookLeaf Support</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search portal"
              className="w-64 rounded-full border border-slate-800 bg-slate-900/90 py-3 pl-11 pr-4 text-sm text-slate-100 outline-none transition focus:border-violet-500"
            />
          </label>
          <NotificationDropdown />
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
