interface BadgeProps {
  label: string;
  variant: 'status' | 'priority' | 'category';
}

const badgeStyles: Record<BadgeProps['variant'], Record<string, string>> = {
  status: {
    Open: 'bg-emerald-500/10 text-emerald-300',
    Pending: 'bg-amber-500/10 text-amber-300',
    Resolved: 'bg-sky-500/10 text-sky-300',
    Closed: 'bg-slate-600/10 text-slate-200',
  },
  priority: {
    Low: 'bg-slate-700/10 text-slate-200',
    Medium: 'bg-amber-500/10 text-amber-300',
    High: 'bg-rose-500/10 text-rose-300',
    Critical: 'bg-violet-500/10 text-violet-300',
  },
  category: {
    Publishing: 'bg-violet-500/10 text-violet-300',
    Billing: 'bg-emerald-500/10 text-emerald-300',
    UX: 'bg-sky-500/10 text-sky-300',
    'AI Assistant': 'bg-fuchsia-500/10 text-fuchsia-300',
    General: 'bg-slate-500/10 text-slate-300',
  },
};

export function Badge({ label, variant }: BadgeProps) {
  const classes = badgeStyles[variant][label] ?? 'bg-slate-700/10 text-slate-200';
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}
