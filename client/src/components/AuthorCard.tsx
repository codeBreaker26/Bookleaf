import { MessageCircle, MoreHorizontal, UserCheck } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export interface AuthorProfile {
  id: string;
  name: string;
  email: string;
  books: number;
  activeTickets: number;
  joined: string;
  status: 'Active' | 'Suspended';
}

interface AuthorCardProps {
  author: AuthorProfile;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initials = author.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-950">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800 text-xl font-semibold text-slate-100">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{author.name}</p>
            <p className="text-sm text-slate-400">{author.email}</p>
          </div>
        </div>
        <StatusBadge status={author.status} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-950 px-4 py-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Books</p>
          <p className="mt-2 text-xl font-semibold text-white">{author.books}</p>
        </div>
        <div className="rounded-3xl bg-slate-950 px-4 py-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tickets</p>
          <p className="mt-2 text-xl font-semibold text-white">{author.activeTickets}</p>
        </div>
        <div className="rounded-3xl bg-slate-950 px-4 py-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Joined</p>
          <p className="mt-2 text-xl font-semibold text-white">{author.joined}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
          <UserCheck className="h-4 w-4" />
          View Profile
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-950">
          <MessageCircle className="h-4 w-4" />
          Message
        </button>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:border-slate-700 hover:bg-slate-950">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
