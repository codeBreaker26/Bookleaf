import api from '@api/axios';
import { API_ENDPOINTS } from '@api/endpoints';

export interface BookApiItem {
  _id: string;
  title: string;
  genre: string;
  status: 'Published' | 'Draft' | 'In Review' | 'Archived' | string;
  author: { _id?: string; name?: string; email?: string } | string | null;
  createdAt?: string;
}

export async function getBooks() {
  const response = await api.get<BookApiItem[]>(API_ENDPOINTS.books.list);
  return response.data;
}
