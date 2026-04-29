import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'auth_username';

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app start — restore saved session from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY).then(saved => {
      if (saved) {
        setUsername(saved);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });
  }, []);

  function login(username: string, password: string): boolean {
    if (!username.trim() || !password.trim()) return false;
    const trimmed = username.trim();
    setIsAuthenticated(true);
    setUsername(trimmed);
    AsyncStorage.setItem(AUTH_KEY, trimmed);
    return true;
  }

  function logout() {
    setIsAuthenticated(false);
    setUsername(null);
    AsyncStorage.removeItem(AUTH_KEY);
    router.replace('/login');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
