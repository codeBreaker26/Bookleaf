import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, MessageCircle, Sparkles, Users } from 'lucide-react';
import { getDashboardStats, getRecentTickets, type DashboardStats, type DashboardTicket } from '@services/adminService';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState';
import { TicketTableRow, type TicketItem } from '@components/TicketTableRow';

function formatTicket(ticket: DashboardTicket): TicketItem {
  const createdAt = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return {
    id: ticket._id,
    subject: ticket.subject,
    author: typeof ticket.author === 'string' ? ticket.author : ticket.author?.name ?? 'Unknown',
    category: ticket.category,
    priority: ticket.priority as TicketItem['priority'],
    status: ticket.status as TicketItem['status'],
    assignedTo:
      typeof ticket.assignedTo === 'string'
        ? ticket.assignedTo
        : ticket.assignedTo?.name ?? 'Unassigned',
    createdAt,
  };
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError(null);

      try {
        const [dashboardData, ticketsData] = await Promise.all([getDashboardStats(), getRecentTickets()]);
        setStats(dashboardData);
        setTickets(ticketsData.slice(0, 5).map(formatTicket));
      } catch (err) {
        setError('Unable to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const ticketSummary = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: 'Total Tickets',
        value: stats.totalTickets,
        icon: MessageCircle,
        tone: 'text-sky-300',
      },
      {
        label: 'Open Tickets',
        value: stats.openTickets,
        icon: Sparkles,
        tone: 'text-emerald-300',
      },
      {
        label: 'Resolved Tickets',
        value: stats.resolvedTickets,
        icon: CheckCircle2,
        tone: 'text-violet-300',
      },
      {
        label: 'Authors',
        value: stats.totalAuthors,
        icon: Users,
        tone: 'text-amber-300',
      },
    ];
  }, [stats]);

  const statCards = stats ? (
    ticketSummary.map((item) => (
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
    ))
  ) : (
    Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
        <div className="h-24 animate-pulse rounded-2xl bg-slate-950" />
      </div>
    ))
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Admin dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Manage books, authors, and support workflows from here.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200">
            <BookOpen className="h-4 w-4 text-violet-400" />
            Backend connected
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-[2rem] border border-rose-600/40 bg-rose-500/10 p-6 text-rose-200">
          <p className="font-semibold">Oops!</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-4">{loading ? statCards : statCards}</section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-2xl shadow-slate-950/20">
        <div className="border-b border-slate-800 px-6 py-5 bg-slate-950/90">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Tickets</h2>
              <p className="mt-1 text-sm text-slate-400">Latest support tickets from the backend feed.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <ArrowRight className="h-4 w-4" />
              Showing {tickets.length} latest
            </div>
          </div>
        </div>

        {loading ? (
          <div className="border-t border-slate-800 bg-slate-950 p-8">
            <LoadingSpinner />
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-8">
            <EmptyState title="No tickets yet" description="No support tickets were returned from the backend. Check back later or create a new ticket from the author portal." />
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
                {tickets.map((ticket) => (
                  <TicketTableRow
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
