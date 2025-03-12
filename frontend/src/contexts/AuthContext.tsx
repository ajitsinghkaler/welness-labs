import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export function AuthProvider({ children, queryClient }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Set the token in axios headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Extract user data from JWT payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userData: User = {
          email: payload.email,
          name: payload.name || payload.email.split('@')[0], // Fallback to email prefix if name not in token
          role: payload.role
        };
        
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error restoring session:', error);
        // If token is invalid, clear it
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Remove any existing token before login
      delete axios.defaults.headers.common['Authorization'];
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      console.log('Login response:', response.data);
      
      const { access_token } = response.data;
      if (!access_token) {
        throw new Error('No access token received');
      }

      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Extract user data from JWT payload
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      const userData: User = {
        email: payload.email,
        name: email.split('@')[0], // Fallback name if not provided
        role: payload.role
      };
      
      console.log('Setting user data:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
      });
      await login(email, password);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    queryClient.clear()
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 