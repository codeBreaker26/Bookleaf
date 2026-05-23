type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950 p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}
