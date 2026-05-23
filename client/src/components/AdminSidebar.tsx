import { useState } from 'react';
import { LayoutDashboard, Ticket, BookOpen, Users, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Tickets', icon: Ticket, href: '/admin/tickets' },
  { label: 'Books', icon: BookOpen, href: '/admin/books' },
  { label: 'Authors', icon: Users, href: '/admin/authors' },
];

interface AdminSidebarProps {
  active?: string;
  onLogout?: () => void;
}

export function AdminSidebar({ active = 'Dashboard', onLogout }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="relative z-20 flex min-h-screen flex-col bg-slate-950 text-slate-100 shadow-xl md:w-72">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 md:hidden">
        <div>
          <p className="text-lg font-semibold">BookLeaf Admin</p>
          <p className="text-sm text-slate-400">Support portal</p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-slate-100 transition hover:bg-slate-800"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`flex flex-col justify-between overflow-hidden transition-all duration-300 md:block ${isOpen ? 'max-h-screen' : 'max-h-0'} md:max-h-full`}>
        <div className="space-y-8 px-5 py-6 md:px-6 md:py-8">
          <div className="hidden md:block">
            <p className="text-2xl font-semibold">BookLeaf Admin</p>
            <p className="mt-1 text-sm text-slate-400">Dark SaaS dashboard experience</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.label;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 px-5 py-5 md:px-6">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
