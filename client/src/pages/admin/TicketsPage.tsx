import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { TicketTableRow, type TicketItem } from '@components/TicketTableRow';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState';
import { getTickets, type TicketApiItem } from '@services/ticketService';

const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'] as const;
const priorities = ['All', 'Low', 'Medium', 'High', 'Critical'] as const;

function formatTicket(ticket: TicketApiItem): TicketItem {
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
    createdAt: new Date(ticket.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}

export function TicketsPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statuses[number]>('All');
  const [priorityFilter, setPriorityFilter] = useState<typeof priorities[number]>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      setError(null);

      try {
        const ticketApiData = await getTickets();
        setTickets(ticketApiData.map(formatTicket));
      } catch (err) {
        setError('Unable to load tickets. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tickets.map((ticket) => ticket.category))).sort();
    return ['All', ...uniqueCategories];
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const lowerQuery = query.toLowerCase();
      const matchesQuery =
        ticket.subject.toLowerCase().includes(lowerQuery) ||
        ticket.author.toLowerCase().includes(lowerQuery) ||
        ticket.id.toLowerCase().includes(lowerQuery);

      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All' || ticket.category === categoryFilter;

      return matchesQuery && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [query, statusFilter, priorityFilter, categoryFilter, tickets]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Support Tickets</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Support Tickets</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Manage current tickets, filter by status, and quickly jump into the issue workflow.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:w-96">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tickets"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-12 py-3 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">Status</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as typeof statuses[number])}
                className="w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">Priority</span>
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as typeof priorities[number])}
                className="w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-slate-500">Category</span>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-violet-500"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </label>
          <div className="hidden items-end justify-end sm:flex">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <Filter className="h-4 w-4" />
              Apply filters
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-2xl shadow-slate-950/20">
        <div className="border-b border-slate-800 px-6 py-5 bg-slate-950/90">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Tickets</h2>
              <p className="mt-1 text-sm text-slate-400">Review and manage support requests in one view.</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="border-t border-slate-800 bg-slate-950 p-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="border-t border-slate-800 bg-slate-950 p-8">
              <EmptyState title="Unable to load tickets" description={error} />
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="border-t border-slate-800 bg-slate-950 p-8">
              <EmptyState title="No tickets found" description="No tickets match your current search or filters." />
            </div>
          ) : (
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
                  <th className="px-6 py-4">Created Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <TicketTableRow
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => navigate(`/admin/tickets/${ticket.id}`)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
