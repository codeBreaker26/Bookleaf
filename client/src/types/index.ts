import { AuthUser } from './auth';

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser, token: string) => Promise<void> | void;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

export type { AuthUser };
