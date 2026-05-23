import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { AuthorCard, type AuthorProfile } from '@components/AuthorCard';

const authors: AuthorProfile[] = [
  {
    id: 'a1',
    name: 'Jenna Lee',
    email: 'jenna.lee@bookleaf.com',
    books: 8,
    activeTickets: 3,
    joined: 'Jan 2024',
    status: 'Active',
  },
  {
    id: 'a2',
    name: 'Noah Sanders',
    email: 'noah.sanders@bookleaf.com',
    books: 5,
    activeTickets: 1,
    joined: 'Mar 2024',
    status: 'Active',
  },
  {
    id: 'a3',
    name: 'Maya Quinn',
    email: 'maya.quinn@bookleaf.com',
    books: 12,
    activeTickets: 2,
    joined: 'Jul 2023',
    status: 'Suspended',
  },
  {
    id: 'a4',
    name: 'Ethan Ross',
    email: 'ethan.ross@bookleaf.com',
    books: 4,
    activeTickets: 0,
    joined: 'Feb 2025',
    status: 'Active',
  },
];

export function AuthorsPage() {
  const [query, setQuery] = useState('');

  const filteredAuthors = useMemo(
    () =>
      authors.filter((author) => {
        const lowerQuery = query.toLowerCase();
        return (
          author.name.toLowerCase().includes(lowerQuery) ||
          author.email.toLowerCase().includes(lowerQuery)
        );
      }),
    [query],
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Authors</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Authors</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Manage your author community, review contributions, and triage author support requests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search authors"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-12 py-3 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <Plus className="h-4 w-4" />
              Add Author
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </section>
    </div>
  );
}
