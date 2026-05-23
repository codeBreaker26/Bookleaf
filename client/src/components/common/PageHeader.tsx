type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
      {subtitle ? <p className="max-w-2xl text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
}
