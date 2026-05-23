import api from '@api/axios';
import { API_ENDPOINTS } from '@api/endpoints';

export interface DashboardStats {
  totalBooks: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  totalAuthors: number;
  totalRoyalty: number;
}

export interface DashboardTicket {
  _id: string;
  subject: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | string;
  author: { name: string } | string | null;
  assignedTo: { name: string } | string | null;
  createdAt: string;
}

export async function getDashboardStats() {
  const response = await api.get<DashboardStats>(API_ENDPOINTS.admin.dashboard);
  return response.data;
}

export async function getRecentTickets() {
  const response = await api.get<DashboardTicket[]>(API_ENDPOINTS.tickets.list);
  return response.data;
}
