type AvatarProps = {
  label: string;
  initials?: string;
};

export function Avatar({ label, initials }: AvatarProps) {
  return (
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-800 text-sm font-semibold text-slate-100">
      {initials ?? label.slice(0, 2).toUpperCase()}
    </div>
  );
}
