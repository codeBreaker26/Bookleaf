import { Badge } from './Badge';

export interface TicketItem {
  id: string;
  subject: string;
  author: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: string;
  createdAt: string;
}

interface TicketTableRowProps {
  ticket: TicketItem;
  onClick: () => void;
}

export function TicketTableRow({ ticket, onClick }: TicketTableRowProps) {
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer border-t border-slate-800 transition hover:bg-slate-900/80"
    >
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{ticket.id}</td>
      <td className="px-6 py-4 text-sm text-white">{ticket.subject}</td>
      <td className="px-6 py-4 text-sm text-slate-300">{ticket.author}</td>
      <td className="px-6 py-4 text-sm">
        <Badge label={ticket.category} variant="category" />
      </td>
      <td className="px-6 py-4 text-sm">
        <Badge label={ticket.priority} variant="priority" />
      </td>
      <td className="px-6 py-4 text-sm">
        <Badge label={ticket.status} variant="status" />
      </td>
      <td className="px-6 py-4 text-sm text-slate-300">{ticket.assignedTo}</td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{ticket.createdAt}</td>
    </tr>
  );
}
