import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import type { AuthUser } from '../types/auth';
import type { AuthContextValue } from '../types/index';
import { setAuthToken, clearAuthToken, getAuthToken } from '@utils/storage';
import api from '@api/axios';

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
  const [initializing, setInitializing] = useState(true);

  const login = async (userData: AuthUser, token: string) => {
    setAuthToken(token);
    setUser(userData);
    setInitializing(false);
  };

  const logout = () => {
    setUser(null);
    clearAuthToken();
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing: initializing,
      login,
      logout,
      hasRole: (role: string) => user?.role === role,
    }),
    [user, initializing],
  );

  useEffect(() => {
    async function init() {
      const token = getAuthToken();
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const resp = await api.get('/users/profile');
        const fetchedUser = resp.data?.user ?? null;
        setUser(fetchedUser);
      } catch (err) {
        // Invalid token or fetch failed — clear token
        clearAuthToken();
        setUser(null);
      } finally {
        setInitializing(false);
      }
    }

    init();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
