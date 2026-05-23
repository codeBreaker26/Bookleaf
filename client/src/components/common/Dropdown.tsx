import type { ReactNode } from 'react';

type DropdownProps = {
  children: ReactNode;
  trigger: ReactNode;
  open: boolean;
};

export function Dropdown({ children, trigger, open }: DropdownProps) {
  return (
    <div className="relative inline-block text-left">
      {trigger}
      {open && <div className="absolute right-0 mt-2 w-72 rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-xl shadow-slate-950/30">{children}</div>}
    </div>
  );
}
