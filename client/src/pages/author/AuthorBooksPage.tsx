import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { SearchBar } from '@components/common/SearchBar';
import { EmptyState } from '@components/common/EmptyState';
import { BookCard } from '@components/BookCard';
import { getBooks, type BookApiItem } from '@services/bookService';

export function AuthorBooksPage() {
  const auth = useAuth();
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<BookApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      setError(null);

      try {
        const allBooks = await getBooks();
        const myBooks = allBooks.filter((book) => {
          const authorId = typeof book.author === 'string' ? book.author : book.author?._id;
          return authorId === auth.user?.id;
        });
        setBooks(myBooks);
      } catch (err) {
        setError('Unable to load books. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [auth.user?.id]);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const lowerQuery = search.toLowerCase();
        return (
          book.title.toLowerCase().includes(lowerQuery) ||
          book.genre.toLowerCase().includes(lowerQuery) ||
          (typeof book.author !== 'string' && book.author?.name?.toLowerCase().includes(lowerQuery))
        );
      }),
    [books, search],
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">My Books</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Published and draft titles</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Review your published books, drafts, and the support tickets associated with each title.
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Search titles, genres, or status" />
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-center text-slate-300">Loading books...</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-600/40 bg-rose-500/10 p-8 text-rose-200">{error}</div>
      ) : filteredBooks.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No books found"
            description="You don’t have any books connected yet. Add a new book through the admin portal or try again later."
          />
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              title={book.title}
              author={typeof book.author === 'string' ? 'You' : book.author?.name ?? 'You'}
              genre={book.genre}
              status={(book.status as 'Published' | 'Draft' | 'In Review' | 'Archived') ?? 'Draft'}
              tickets={0}
              createdAt={book.createdAt ? new Date(book.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
