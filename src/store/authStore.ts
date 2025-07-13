import { MenuGroup } from "@/constants/MenuItems";
import { IUserLoginResponse } from "@/services/usuario/IUsuario";
import { useCallback, useMemo } from "react";

export const useAuthLocalStorage = () => {
  const tokenStore = useMemo(() => {
    return localStorage.getItem("token");
  }, []);

  const setTokenStore = useCallback((token: string) => {
    return localStorage.setItem("token", token);
  }, []);

  const removeTokenStore = useCallback(() => {
    return localStorage.removeItem("token");
  }, []);

  const menuItemsStore = useMemo(() => {
    const menuItems = localStorage.getItem("menuItems");
    if (menuItems) {
      return JSON.parse(menuItems);
    }
    return null;
  }, []);

  const setMenuItemsStore = useCallback((menuItems: MenuGroup[]) => {
    return localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, []);

  const getUserStore = useMemo(() => {
    return localStorage.getItem("user");
  }, []);

  const setUserStore = useCallback((user: IUserLoginResponse) => {
    return localStorage.setItem("user", JSON.stringify(user));
  }, []);

  return {
    tokenStore,
    setTokenStore,
    removeTokenStore,
    menuItemsStore,
    setMenuItemsStore,
    getUserStore,
    setUserStore,
  };
};
