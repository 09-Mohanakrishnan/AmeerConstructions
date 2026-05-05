import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface AdminUser {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  admin: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      if (storedToken) {
        try {
          const { data } = await api.get('/auth/me');
          setAdmin(data);
          setToken(storedToken);
        } catch {
          localStorage.removeItem('adminToken');
          setAdmin(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('adminToken', data.token);
    setToken(data.token);
    setAdmin({ _id: data._id, name: data.name, email: data.email });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
