import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Clock3, Tag, ShieldAlert, BookOpen } from 'lucide-react';
import { getTicketById, TicketDetailApiItem } from '@services/ticketService';
import { EmptyState } from '@components/common/EmptyState';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { InfoCard, InfoRow } from '@components/InfoCard';
import { MessageBubble } from '@components/MessageBubble';

type TicketDetailView = {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  book: {
    id: string;
    title: string;
    genre: string;
    status: string;
  };
  messages: Array<{
    id: string;
    sender: 'admin' | 'author';
    senderName: string;
    content: string;
    timestamp: string;
  }>;
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function mapTicket(ticket: TicketDetailApiItem): TicketDetailView {
  const createdAt = formatTimestamp(ticket.createdAt);
  const book = {
    id: ticket.book?._id ?? '',
    title: ticket.book?.title ?? 'Unknown title',
    genre: ticket.book?.genre ?? 'Unknown genre',
    status: ticket.book?.status ?? 'Unknown',
  };
  const authorName = typeof ticket.author === 'string' ? ticket.author : ticket.author?.name ?? 'You';

  return {
    id: ticket._id,
    subject: ticket.subject,
    description: ticket.description,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    createdAt,
    book,
    messages: ticket.messages.map((message) => {
      const sender: 'admin' | 'author' = message.senderRole === 'admin' || message.sender === 'admin' ? 'admin' : 'author';
      const senderName = sender === 'admin' ? 'Support' : authorName;
      return {
        id: message._id ?? `${ticket._id}-${message.createdAt}`,
        sender,
        senderName,
        content: message.message,
        timestamp: formatTimestamp(message.createdAt),
      };
    }),
  };
}

export function AuthorTicketDetailsPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketDetailView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTicket() {
      if (!ticketId) {
        setError('Missing ticket ID.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getTicketById(ticketId);
        setTicket(mapTicket(data));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unable to load ticket details.');
        setTicket(null);
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100">
        <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="bg-slate-950 text-slate-100">
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          <button
            type="button"
            onClick={() => navigate('/author/tickets')}
            className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <EmptyState
            title={error ? 'Unable to load ticket' : 'Ticket not found'}
            description={error ?? 'The ticket you requested could not be loaded. Please go back and try again.'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/author/tickets')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Ticket details</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">{ticket.subject}</h1>
              <p className="mt-1 text-sm text-slate-400">{ticket.id}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900 px-5 py-4 text-sm text-slate-200">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock3 className="h-4 w-4" />
              <span>Created {ticket.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard title="Status" icon={<ShieldAlert className="h-4 w-4" />}>
                  <InfoRow
                    label="State"
                    value={<span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-100">{ticket.status}</span>}
                  />
                  <InfoRow
                    label="Priority"
                    value={<span className="inline-flex rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">{ticket.priority}</span>}
                  />
                  <InfoRow label="Category" value={ticket.category} />
                  <InfoRow label="Created" value={ticket.createdAt} />
                </InfoCard>

                <InfoCard title="Book info" icon={<BookOpen className="h-4 w-4" />}>
                  <InfoRow label="Title" value={ticket.book.title} />
                  <InfoRow label="Genre" value={ticket.book.genre} />
                  <InfoRow label="Status" value={ticket.book.status} />
                </InfoCard>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Description</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{ticket.description}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Conversation</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Message thread</h2>
                </div>
                <div className="text-sm text-slate-400">{ticket.messages.length} messages</div>
              </div>

              {ticket.messages.length === 0 ? (
                <div className="mt-8 rounded-3xl border border-dashed border-slate-800 bg-slate-950 p-10 text-center">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">No conversation yet</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">Support replies will appear here once the team responds.</p>
                </div>
              ) : (
                <div className="mt-6 space-y-4 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  {ticket.messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      sender={message.sender}
                      senderName={message.senderName}
                      content={message.content}
                      timestamp={message.timestamp}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
              <div className="mt-6 space-y-3">
                <button className="w-full rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
                  Add note
                </button>
                <button className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                  Download transcript
                </button>
                <button className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                  View ticket history
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Status summary</p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Category</p>
                  <p className="mt-2 text-sm font-semibold text-white">{ticket.category}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Priority</p>
                  <p className="mt-2 text-sm font-semibold text-white">{ticket.priority}</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Current status</p>
                  <p className="mt-2 text-sm font-semibold text-white">{ticket.status}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
