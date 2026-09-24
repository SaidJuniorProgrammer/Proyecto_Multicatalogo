import { createContext, useContext, useState, type ReactNode } from 'react';

type UserRole = 'admin' | 'cliente' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: UserRole;
  token: string | null;
  login: (email: string, role: UserRole, token?: string) => void;
  logout: () => void;
}

interface AuthSession {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: UserRole;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<AuthSession>(() => {
    const savedEmail = localStorage.getItem('multicat_email');
    const savedRole = localStorage.getItem('multicat_role') as UserRole;
    const savedToken = localStorage.getItem('multicat_token');

    return savedEmail && savedRole && savedToken
      ? { isAuthenticated: true, userEmail: savedEmail, userRole: savedRole, token: savedToken }
      : { isAuthenticated: false, userEmail: null, userRole: null as UserRole, token: null };
  });

  const login = (email: string, role: UserRole, authToken?: string) => {
    const nextToken = authToken ?? 'fake-jwt-token';

    setSession({ isAuthenticated: true, userEmail: email, userRole: role, token: nextToken });

    localStorage.setItem('multicat_email', email);
    localStorage.setItem('multicat_role', role ?? '');
    localStorage.setItem('multicat_token', nextToken);
  };

  const logout = () => {
    setSession({ isAuthenticated: false, userEmail: null, userRole: null, token: null });

    localStorage.removeItem('multicat_email');
    localStorage.removeItem('multicat_role');
    localStorage.removeItem('multicat_token');
  };

  return (
    <AuthContext.Provider value={{ ...session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};