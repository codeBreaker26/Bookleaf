import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageCircle, Sparkles, LifeBuoy, PlusCircle } from 'lucide-react';
import { useAuth } from '@hooks/useAuth';
import { getTickets, type TicketApiItem } from '@services/ticketService';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState';
import { TicketTableRow, type TicketItem } from '@components/TicketTableRow';

function formatTicket(ticket: TicketApiItem): TicketItem {
  return {
    id: ticket._id,
    subject: ticket.subject,
    author: typeof ticket.author === 'string' ? ticket.author : ticket.author?.name ?? 'You',
    category: ticket.category,
    priority: ticket.priority as TicketItem['priority'],
    status: ticket.status as TicketItem['status'],
    assignedTo:
      typeof ticket.assignedTo === 'string'
        ? ticket.assignedTo
        : ticket.assignedTo?.name ?? 'Unassigned',
    createdAt: new Date(ticket.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

export function AuthorDashboardPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAuthorTickets() {
      setLoading(true);
      setError(null);

      try {
        const ticketApiData = await getTickets();
        setTickets(ticketApiData.map(formatTicket));
      } catch (err) {
        setError('Unable to load author ticket data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadAuthorTickets();
  }, []);

  const stats = useMemo(() => {
    const openTickets = tickets.filter((ticket) => ticket.status === 'Open' || ticket.status === 'In Progress').length;
    const highPriority = tickets.filter((ticket) => ticket.priority === 'High' || ticket.priority === 'Critical').length;
    const inProgress = tickets.filter((ticket) => ticket.status === 'In Progress').length;
    return {
      totalTickets: tickets.length,
      openTickets,
      highPriority,
      inProgress,
    };
  }, [tickets]);

  const statCards = [
    {
      label: 'Total tickets',
      value: stats.totalTickets,
      icon: MessageCircle,
      tone: 'text-sky-300',
    },
    {
      label: 'Open tickets',
      value: stats.openTickets,
      icon: Sparkles,
      tone: 'text-emerald-300',
    },
    {
      label: 'High priority',
      value: stats.highPriority,
      icon: LifeBuoy,
      tone: 'text-amber-300',
    },
    {
      label: 'In progress',
      value: stats.inProgress,
      icon: BookOpen,
      tone: 'text-violet-300',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, {auth.user?.name ?? 'Author'}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Manage your books, tickets, and support details from a single author portal.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/author/create-ticket"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <PlusCircle className="h-4 w-4" />
              New ticket
            </Link>
            <Link
              to="/author/tickets"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900"
            >
              <ArrowRight className="h-4 w-4" />
              View tickets
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        {statCards.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-sm shadow-slate-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
              </div>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 ${item.tone}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-2xl shadow-slate-950/20">
        <div className="border-b border-slate-800 px-6 py-5 bg-slate-950/90">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent tickets</h2>
              <p className="mt-1 text-sm text-slate-400">Your most recent support requests.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <ArrowRight className="h-4 w-4" />
              Showing {Math.min(tickets.length, 5)} latest
            </div>
          </div>
        </div>

        {loading ? (
          <div className="border-t border-slate-800 bg-slate-950 p-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="border-t border-slate-800 bg-slate-950 p-8">
            <EmptyState title="Unable to load tickets" description={error} />
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-8">
            <EmptyState title="No tickets yet" description="Open a new ticket to connect with support and keep your author workflow moving." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {tickets.slice(0, 5).map((ticket) => (
                  <TicketTableRow key={ticket.id} ticket={ticket} onClick={() => navigate('/author/tickets')} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
