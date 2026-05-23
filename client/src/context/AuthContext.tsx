import { createContext, ReactNode, useMemo, useState } from 'react';
import type { AuthUser } from '../types/auth';
import type { AuthContextValue } from '../types/index';
import { setAuthToken, clearAuthToken } from '@utils/storage';

const initialValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  hasRole: () => false,
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (userData: AuthUser, token: string) => {
    setUser(userData);
    setAuthToken(token);
  };

  const logout = () => {
    setUser(null);
    clearAuthToken();
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      hasRole: (role: string) => user?.role === role,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
