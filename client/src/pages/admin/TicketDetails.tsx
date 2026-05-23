import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketById, TicketDetailApiItem } from '@services/ticketService';
import { EmptyState } from '@components/common/EmptyState';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  MessageCircle,
  Send,
  Settings2,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';
import { InfoCard, InfoRow } from '@components/InfoCard';
import { MessageBubble } from '@components/MessageBubble';

type TicketDetailView = {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
  assignedTo: string;
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
  internalNotes: string[];
  aiDraft: string;
  activity: Array<{
    id: string;
    type: 'status' | 'assignment' | 'message';
    description: string;
    timestamp: string;
    user: string;
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
    hour: 'numeric',
    minute: '2-digit',
  });
}

function mapTicketToView(ticket: TicketDetailApiItem): TicketDetailView {
  const authorName = typeof ticket.author === 'string' ? ticket.author : ticket.author?.name ?? 'Unknown Author';
  const authorEmail = typeof ticket.author === 'object' && ticket.author && 'email' in ticket.author ? ticket.author.email ?? '' : '';
  const assignedTo = typeof ticket.assignedTo === 'string' ? ticket.assignedTo : ticket.assignedTo?.name ?? 'Unassigned';
  const createdAt = formatTimestamp(ticket.createdAt);
  const messages = ticket.messages.map((message) => {
    const sender: 'admin' | 'author' = message.senderRole === 'admin' || message.sender === 'admin' ? 'admin' : 'author';
    const senderName = sender === 'admin' ? assignedTo : authorName;
    return {
      id: message._id ?? `${ticket._id}-${message.createdAt}`,
      sender,
      senderName,
      content: message.message,
      timestamp: formatTimestamp(message.createdAt),
    };
  });
  const activity = [
    ...(messages.length > 0
      ? [
          {
            id: `activity-last-message-${messages[messages.length - 1].id}`,
            type: 'message' as const,
            description: `Last message from ${messages[messages.length - 1].senderName}`,
            timestamp: messages[messages.length - 1].timestamp,
            user: messages[messages.length - 1].senderName,
          },
        ]
      : []),
    {
      id: `activity-assigned-${ticket._id}`,
      type: 'assignment' as const,
      description: `Ticket assigned to ${assignedTo}`,
      timestamp: createdAt,
      user: 'System',
    },
    {
      id: `activity-status-${ticket._id}`,
      type: 'status' as const,
      description: `Status changed to ${ticket.status}`,
      timestamp: createdAt,
      user: 'System',
    },
  ];

  return {
    id: ticket._id,
    subject: ticket.subject,
    description: ticket.description,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
    authorName,
    authorEmail,
    createdAt,
    assignedTo,
    book: {
      id: ticket.book?._id ?? '',
      title: ticket.book?.title ?? 'Unknown Title',
      genre: ticket.book?.genre ?? 'Unknown',
      status: ticket.book?.status ?? 'Unknown',
    },
    messages,
    internalNotes: ticket.internalNotes.map((note) => note.message),
    aiDraft: ticket.aiDraftResponse ?? '',
    activity,
  };
}

const fallbackTicket: TicketDetailView = {
  id: 't1',
  subject: 'Unable to publish book preview',
  description:
    'I am trying to publish a preview of my new novel, but the system keeps throwing an error when I try to submit the cover image. The error appears to be related to image size validation.',
  category: 'Publishing',
  priority: 'High',
  status: 'Open',
  authorName: 'Jenna L.',
  authorEmail: 'jenna.l@email.com',
  createdAt: 'May 20, 2026',
  assignedTo: 'Sarah Chen',
  book: {
    id: 'b1',
    title: 'The Forgotten Garden',
    genre: 'Fiction',
    status: 'In Review',
  },
  messages: [
    {
      id: 'm1',
      sender: 'author',
      senderName: 'Jenna L.',
      content:
        'Hi, I\'ve been trying to upload my book cover for the last hour but keep getting an error. Can you help me?',
      timestamp: '10:30 AM',
    },
    {
      id: 'm2',
      sender: 'admin',
      senderName: 'Sarah Chen',
      content:
        'Hi Jenna! I\'d be happy to help. Can you tell me the file size and format of the image you\'re trying to upload?',
      timestamp: '10:45 AM',
    },
    {
      id: 'm3',
      sender: 'author',
      senderName: 'Jenna L.',
      content:
        'It\'s a PNG file, about 8.5MB. I tried resizing it to 5MB but still getting the error.',
      timestamp: '11:00 AM',
    },
    {
      id: 'm4',
      sender: 'admin',
      senderName: 'Sarah Chen',
      content:
        'I see the issue now. The system requires images to be under 5MB. Let me check if there\'s a validation bug. In the meantime, can you try resizing to 3MB?',
      timestamp: '11:15 AM',
    },
  ],
  internalNotes: [
    'Likely related to recent image upload validator changes - needs investigation',
    'Similar reports from 2 other authors today',
  ],
  aiDraft:
    'Thank you for reporting this issue. We\'ve identified a bug in our image upload validation system. We\'re actively working on a fix and expect to deploy it within the next 24 hours. In the meantime, please ensure your cover image is under 3MB for successful upload.',
  activity: [
    {
      id: 'a1',
      type: 'message',
      description: 'Last message from Jenna L.',
      timestamp: '11:15 AM',
      user: 'Jenna L.',
    },
    {
      id: 'a2',
      type: 'assignment',
      description: 'Ticket assigned to Sarah Chen',
      timestamp: '10:25 AM',
      user: 'Admin System',
    },
    {
      id: 'a3',
      type: 'status',
      description: 'Status changed to Open',
      timestamp: '10:20 AM',
      user: 'System',
    },
  ],
};

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState('');
  const [ticket, setTicket] = useState<TicketDetailView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTicket() {
      if (!id) {
        setError('Ticket ID is missing.');
        setTicket(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const ticketData = await getTicketById(id);
        setTicket(mapTicketToView(ticketData));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load ticket details.');
        setTicket(null);
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-slate-950 text-slate-100">
        <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-4 py-8">
          <div className="h-12 w-12">
            <LoadingSpinner />
          </div>
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
            onClick={() => navigate(-1)}
            className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <EmptyState
            title={error ? 'Unable to load ticket' : 'Ticket not found'}
            description={error ?? 'The ticket you requested could not be found.'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-white">Ticket {ticket.id}</h1>
            <p className="mt-1 text-sm text-slate-400">{ticket.subject}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="space-y-5 lg:col-span-1">
            <InfoCard title="Ticket Info" icon={<MessageCircle className="h-4 w-4" />}>
              <InfoRow label="Status" value={<span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300">{ticket.status}</span>} />
              <InfoRow label="Priority" value={<span className="inline-flex rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-300">{ticket.priority}</span>} />
              <InfoRow label="Category" value={ticket.category} />
              <InfoRow label="Created" value={ticket.createdAt} />
              <InfoRow label="Assigned To" value={ticket.assignedTo} />
            </InfoCard>

            <InfoCard title="Author" icon={<User className="h-4 w-4" />}>
              <InfoRow label="Name" value={ticket.authorName} />
              <InfoRow label="Email" value={ticket.authorEmail || 'Unknown'} />
              <InfoRow label="Joined" value="Unknown" />
              <InfoRow label="Books" value="1" />
            </InfoCard>

            <InfoCard title="Book" icon={<BookOpen className="h-4 w-4" />}>
              <InfoRow label="Title" value={ticket.book.title} />
              <InfoRow label="Genre" value={ticket.book.genre} />
              <InfoRow label="Status" value={ticket.book.status} />
            </InfoCard>
          </aside>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Description</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{ticket.description}</p>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Conversation</p>
                <p className="mt-1 text-sm text-slate-400">{ticket.messages.length} messages</p>
              </div>

              <div className="flex max-h-96 flex-col gap-5 overflow-y-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                {ticket.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    sender={msg.sender}
                    senderName={msg.senderName}
                    content={msg.content}
                    timestamp={msg.timestamp}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="flex-1 resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm placeholder-slate-500 outline-none transition focus:border-violet-600"
                  rows={3}
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500">
                <Send className="h-4 w-4" />
                Send Reply
              </button>
            </div>
          </div>

          <aside className="space-y-5 lg:col-span-1">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-semibold text-white">AI Draft Response</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{ticket.aiDraft || 'No draft available yet.'}</p>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-600 bg-violet-600/10 px-3 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-600/20">
                <Zap className="h-4 w-4" />
                Use Draft
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm font-semibold text-white">Internal Notes</p>
              <div className="mt-4 space-y-3">
                {ticket.internalNotes.length > 0 ? (
                  ticket.internalNotes.map((note, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                      <p className="text-xs text-slate-400">{note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">No internal notes yet.</p>
                )}
              </div>
              <input
                type="text"
                placeholder="Add a note..."
                className="mt-4 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs placeholder-slate-500 outline-none transition focus:border-slate-700"
              />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-white">Actions</p>
              </div>
              <div className="mt-4 space-y-2">
                <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none transition focus:border-slate-700">
                  <option>Assign To...</option>
                  <option>Sarah Chen</option>
                  <option>Mike Johnson</option>
                  <option>Lisa Wang</option>
                </select>
                <select className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none transition focus:border-slate-700">
                  <option>Change Status...</option>
                  <option>Open</option>
                  <option>Pending</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-white">Activity</p>
              </div>
              <div className="mt-4 space-y-3">
                {ticket.activity.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-violet-500" />
                    <div>
                      <p className="text-xs font-medium text-slate-300">{item.description}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
