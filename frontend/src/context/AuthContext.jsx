import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then((response) => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const saveAuth = (data) => {
    localStorage.setItem('token', data.token);
    const nextUser = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    saveAuth(response.data);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    saveAuth(response.data);
    return response.data;
  };

  const logout = async () => {
    try {
      if (localStorage.getItem('token')) {
        await api.post('/auth/logout');
      }
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
