export interface TicketRow {
  id: string;
  subject: string;
  category: string;
  priority: string;
  status: 'Open' | 'Resolved' | 'Pending';
  author: string;
  createdAt: string;
}

export interface BookInfo {
  id: string;
  title: string;
  genre: string;
  status: string;
}

export interface Message {
  id: string;
  sender: 'admin' | 'author';
  senderName: string;
  content: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'status' | 'assignment' | 'message';
  description: string;
  timestamp: string;
  user: string;
}

export interface TicketDetails {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: 'Open' | 'Resolved' | 'Pending';
  author: string;
  createdAt: string;
  assignedTo: string;
  book: BookInfo;
  messages: Message[];
  internalNotes: string[];
  aiDraft: string;
  activity: ActivityItem[];
}
