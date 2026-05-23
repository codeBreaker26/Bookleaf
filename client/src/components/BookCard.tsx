import { MoreHorizontal, BookOpen, CalendarDays } from 'lucide-react';

type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  status: 'Published' | 'Draft' | 'In Review' | 'Archived';
  tickets: number;
  createdAt: string;
};

export function BookCard({ title, author, genre, status, tickets, createdAt }: BookCardProps) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-violet-500/40 hover:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Book</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-slate-300 transition hover:bg-slate-800">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <BookOpen className="h-4 w-4 text-violet-400" />
          <span>{genre}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span>Created {createdAt}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
          {status}
        </span>
        <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">
          {tickets} tickets
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Author</p>
          <p className="mt-1 font-medium text-white">{author}</p>
        </div>
        <button className="rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800">
          Manage
        </button>
      </div>
    </article>
  );
}
