import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, type BookApiItem } from '@services/bookService';
import { createTicket } from '@services/ticketService';
import { useAuth } from '@hooks/useAuth';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

export function CreateTicketPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookApiItem[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadBooks() {
      setLoading(true);
      try {
        const allBooks = await getBooks();
        const myBooks = allBooks.filter((book) => {
          const bookAuthorId = typeof book.author === 'string' ? book.author : book.author?._id;
          return bookAuthorId === auth.user?.id;
        });
        setBooks(myBooks);
        if (myBooks.length > 0) {
          setSelectedBook(myBooks[0]._id);
        }
      } catch (err) {
        setError('Unable to load book options. You can still submit a ticket without attaching a book.');
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, [auth.user?.id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await createTicket({
        subject,
        description,
        book: selectedBook || undefined,
      });
      setSuccess('Ticket submitted successfully. Redirecting to tickets...');
      window.setTimeout(() => navigate('/author/tickets'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Unable to submit ticket. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">New Support Ticket</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Open a new ticket</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Describe your issue and our support team will help you resolve it quickly.
            </p>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-center">
          <LoadingSpinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Subject</span>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="e.g. Royalty payment not received"
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-300">Book</span>
              <select
                value={selectedBook}
                onChange={(event) => setSelectedBook(event.target.value)}
                className="mt-3 w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              >
                <option value="">No book selected</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Provide a detailed summary of your issue, what you expected, and any relevant book details."
              rows={8}
              className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm text-white outline-none transition focus:border-violet-500"
              required
            />
          </label>

          {error ? <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}
          {success ? <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</p> : null}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? 'Submitting ticket...' : 'Submit ticket'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
