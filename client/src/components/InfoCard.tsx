interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function InfoCard({ title, children, icon }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center gap-2">
        {icon && <div className="text-slate-400">{icon}</div>}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-start gap-2">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}
