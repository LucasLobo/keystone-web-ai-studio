import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  devLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await api.auth.me();
      setUser(userData);
    } catch (error) {
      console.error('Failed to check auth', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      // 1. Get the auth URL
      const redirectUri = `${window.location.origin}/auth/callback`;
      const { url } = await api.auth.getGoogleUrl(redirectUri);

      // 2. Open popup
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        url,
        'google_login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        alert('Please allow popups to log in.');
        return;
      }

      // 3. Listen for success message
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
          if (event.data.user) {
            setUser(event.data.user);
          } else {
            checkAuth();
          }
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);

    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const devLogin = async () => {
    try {
      const { user: userData } = await api.auth.devLogin();
      setUser(userData);
    } catch (error) {
      console.error('Dev login failed', error);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, devLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
