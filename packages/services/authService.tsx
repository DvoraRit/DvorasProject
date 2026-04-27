import { createContext, useContext, useState, ReactNode } from 'react';

// ─── Hardcoded credentials ────────────────────────────────────────────────────
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'dvora123';
// ─────────────────────────────────────────────────────────────────────────────

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(username: string, password: string): boolean {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
