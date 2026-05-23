import type { ReactNode } from 'react';

type DataTableProps = {
  headers: string[];
  rows: ReactNode[];
};

export function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="border-b border-slate-800 bg-slate-950 text-slate-400">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-4 font-medium uppercase tracking-[0.18em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">{rows}</tbody>
      </table>
    </div>
  );
}
