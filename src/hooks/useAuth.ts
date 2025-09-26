import { getToken, removeToken, setToken } from "@/api/config";
import { IBrother } from "@/interfaces/IBrother";
import { setLocalStorageBrother } from "@/services/brothers/brother.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const login = (brother: IBrother) => {
    setLocalStorageBrother(brother);
    setToken(JSON.stringify(brother));
    setIsAuthenticated(true);
    router.push("/home");
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
