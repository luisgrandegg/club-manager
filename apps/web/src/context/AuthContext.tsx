import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { apiClient, setAuthToken } from '@club-manager/sdk';

export interface CurrentUser {
  id: number;
  email: string;
}

interface AuthState {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const REFRESH_TOKEN_KEY = 'club_manager_refresh_token';

function parseJwtPayload(token: string): { sub: number; email: string } {
  const base64 = token.split('.')[1];
  return JSON.parse(atob(base64));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  // Start loading only if we have a refresh token to attempt restoration with
  const [isLoading, setIsLoading] = useState(
    () => !!localStorage.getItem(REFRESH_TOKEN_KEY),
  );

  const applyTokens = useCallback(
    (accessToken: string, refreshToken?: string) => {
      setAuthToken(accessToken);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
      const payload = parseJwtPayload(accessToken);
      setCurrentUser({ id: payload.sub, email: payload.email });
    },
    [],
  );

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setCurrentUser(null);
  }, []);

  // Try to restore session from stored refresh token on mount
  useEffect(() => {
    const storedRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!storedRefresh) return;

    apiClient
      .POST('/api/auth/refresh', { body: { refresh_token: storedRefresh } })
      .then(({ data, error }) => {
        if (data && !error) {
          applyTokens(data.access_token);
        } else {
          localStorage.removeItem(REFRESH_TOKEN_KEY);
        }
      })
      .catch(() => localStorage.removeItem(REFRESH_TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, [applyTokens]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await apiClient.POST('/api/auth/login', {
        body: { email, password },
      });
      if (error || !data) throw new Error('Invalid email or password');
      applyTokens(data.access_token, data.refresh_token);
    },
    [applyTokens],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await apiClient.POST('/api/auth/register', {
        body: { email, password },
      });
      if (error || !data) throw new Error('Registration failed');
      applyTokens(data.access_token, data.refresh_token);
    },
    [applyTokens],
  );

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
