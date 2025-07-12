import { useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '@/api/config';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token: string) => {
    setToken(token);
    setIsAuthenticated(true);
    router.push('/home');
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push('/login');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
} 