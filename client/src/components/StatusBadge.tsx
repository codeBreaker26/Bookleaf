interface StatusBadgeProps {
  status: 'Active' | 'Suspended';
}

const statusStyles: Record<StatusBadgeProps['status'], string> = {
  Active: 'bg-emerald-500/10 text-emerald-300',
  Suspended: 'bg-rose-500/10 text-rose-300',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
