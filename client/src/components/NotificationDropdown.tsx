import { Bell, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

const notifications = [
  {
    id: 'n1',
    icon: <MessageCircle className="h-4 w-4 text-violet-400" />,
    title: 'New ticket assigned',
    description: 'You have a new high-priority ticket from an author.',
    time: '2m ago',
  },
  {
    id: 'n2',
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    title: 'Ticket resolved',
    description: 'A pending request has been marked resolved.',
    time: '15m ago',
  },
  {
    id: 'n3',
    icon: <Sparkles className="h-4 w-4 text-amber-400" />,
    title: 'AI summary ready',
    description: 'Draft response is available for review.',
    time: '30m ago',
  },
];

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-200 transition hover:bg-slate-800"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-slate-950" />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-slate-800 bg-slate-950 p-4 text-slate-200 shadow-xl shadow-slate-950/40">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
              New
            </span>
          </div>

          <div className="space-y-3">
            {notifications.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-200">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
