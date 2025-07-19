import { FlatMenuItem, NestedMenuItem } from "@/constants/MenuItems";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  Home,
  LucideProps,
  Package,
  ShieldBan,
  Users,
  Warehouse,
} from "lucide-react";
import React from "react";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const errorApiSupabase = (error: ErrorTypeSupabase) => {
  throw error;
};

export const iconMap: Record<
  string,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  Home,
  Package,
  Users,
  ShieldBan,
  Warehouse,
};

export function transformToNestedMenu(
  flatMenu: FlatMenuItem[]
): NestedMenuItem[] {
  const menuMap = new Map<string, NestedMenuItem>();

  for (const item of flatMenu) {
    const menuTitle = item.menunombre;
    if (!menuMap.has(menuTitle)) {
      menuMap.set(menuTitle, {
        title: menuTitle,
        items: [],
      });
    }

    const menu = menuMap.get(menuTitle)!;
    menu.items.push({
      title: item.submenunombre,
      path: item.path,
    });
  }

  return Array.from(menuMap.values());
}
