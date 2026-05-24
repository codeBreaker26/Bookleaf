import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle, BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/author' },
  { label: 'My Tickets', icon: Ticket, href: '/author/tickets' },
  { label: 'New Ticket', icon: PlusCircle, href: '/author/create-ticket' },
  { label: 'Books', icon: BookOpen, href: '/author/books' },
  { label: 'Profile', icon: User, href: '/author/profile' },
];

export function AuthorSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const activePath = location.pathname;

  return (
    <aside className="relative z-20 flex min-h-screen flex-col bg-slate-950 text-slate-100 shadow-xl md:w-72">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 md:hidden">
        <div>
          <p className="text-lg font-semibold">BookLeaf Author</p>
          <p className="text-sm text-slate-400">Creator support portal</p>
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
            <p className="text-2xl font-semibold">BookLeaf Author</p>
            <p className="mt-1 text-sm text-slate-400">Support your publishing and books.</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Signed in as</p>
            <p className="mt-3 font-semibold text-white">{auth.user?.name ?? 'Author'}</p>
            <p className="mt-1 text-slate-500">{auth.user?.email ?? ''}</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-slate-800 px-5 py-5 md:px-6">
          <button
            type="button"
            onClick={() => {
              auth.logout();
              navigate('/login');
            }}
            className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            <span className="flex items-center gap-3">
              <LogOut className="h-5 w-5" />
              Sign out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
