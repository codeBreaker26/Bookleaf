import api from '@api/axios';
import { API_ENDPOINTS } from '@api/endpoints';

export interface AIChatRequest {
  question: string;
  context?: string;
}

export interface AIChatResponse {
  answer: string;
}

export async function askAI(request: AIChatRequest) {
  const response = await api.post<AIChatResponse>(API_ENDPOINTS.ai.chat, request);
  return response.data;
}
