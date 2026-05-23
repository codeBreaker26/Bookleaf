import { useMemo, useState } from 'react';
import { SearchBar } from '@components/common/SearchBar';
import { PageHeader } from '@components/common/PageHeader';
import { BookCard } from '@components/BookCard';

const books = [
  {
    id: 'b1',
    title: 'The Forgotten Garden',
    author: 'Jenna L.',
    genre: 'Fiction',
    status: 'In Review',
    tickets: 4,
    createdAt: 'May 12, 2026',
  },
  {
    id: 'b2',
    title: 'Code & Coffee',
    author: 'Marcus A.',
    genre: 'Nonfiction',
    status: 'Published',
    tickets: 1,
    createdAt: 'Apr 1, 2026',
  },
  {
    id: 'b3',
    title: 'The Quiet Hall',
    author: 'Priya R.',
    genre: 'Mystery',
    status: 'Draft',
    tickets: 2,
    createdAt: 'Jun 2, 2026',
  },
  {
    id: 'b4',
    title: 'Infinite Pages',
    author: 'Isabella M.',
    genre: 'Fantasy',
    status: 'Archived',
    tickets: 0,
    createdAt: 'Feb 18, 2026',
  },
];

export default function BooksPage() {
  const [search, setSearch] = useState('');

  const filteredBooks = useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase()) || book.genre.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PageHeader title="Books" subtitle="Manage publishing status, book metadata, and support tickets." />
        <SearchBar value={search} onChange={(value) => setSearch(value)} placeholder="Search books, authors, genres" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            status={book.status as 'In Review' | 'Published' | 'Draft' | 'Archived'}
            tickets={book.tickets}
            createdAt={book.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
