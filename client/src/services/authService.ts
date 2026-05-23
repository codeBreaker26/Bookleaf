import api from '@api/axios';
import { API_ENDPOINTS } from '@api/endpoints';
import type { AuthUser } from '../types/auth';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}

export async function login(payload: LoginPayload) {
  const response = await api.post<LoginResponse>(API_ENDPOINTS.auth.login, payload);
  return response.data;
}

export async function refreshToken() {
  const response = await api.post<{ accessToken: string }>(API_ENDPOINTS.auth.refresh);
  return response.data;
}
