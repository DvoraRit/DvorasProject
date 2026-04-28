import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  function login(username: string, password: string): boolean {
   //allow any non-empty username/password for this demo
    if (!username.trim() || !password.trim()) return false;
    setIsAuthenticated(true);
    setUsername(username.trim());
    return true;
  }

  function logout() {
    setIsAuthenticated(false);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
