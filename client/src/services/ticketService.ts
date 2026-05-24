import api from '@api/axios';
import { API_ENDPOINTS } from '@api/endpoints';

export interface TicketApiItem {
  _id: string;
  subject: string;
  author: { name: string; email?: string } | string | null;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | string;
  assignedTo: { name: string } | string | null;
  createdAt: string;
}

export interface TicketDetailApiItem extends TicketApiItem {
  description: string;
  book: {
    _id?: string;
    title?: string;
    genre?: string;
    status?: string;
  } | null;
  messages: Array<{
    _id?: string;
    sender?: string;
    senderRole?: string;
    message: string;
    createdAt: string;
  }>;
  internalNotes: Array<{ message: string; addedBy?: string; createdAt?: string }>;
  aiDraftResponse?: string;
}

export interface CreateTicketPayload {
  subject: string;
  description: string;
  book?: string;
}

export async function getTickets() {
  const response = await api.get<TicketApiItem[]>(API_ENDPOINTS.tickets.list);
  return response.data;
}

export async function createTicket(payload: CreateTicketPayload) {
  const response = await api.post(API_ENDPOINTS.tickets.create, payload);
  return response.data;
}

export async function getTicketById(ticketId: string) {
  const response = await api.get<TicketDetailApiItem[]>(API_ENDPOINTS.tickets.list);
  const ticket = response.data.find((item) => item._id === ticketId);
  if (!ticket) {
    throw new Error('Ticket not found');
  }
  return ticket;
}
