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

export function transformToNestedMenu(data: FlatMenuItem[]): NestedMenuItem[] {
  const menuMap = new Map<number, NestedMenuItem>();

  for (const row of data) {
    const menuId = row.menuid;

    if (!menuMap.has(menuId)) {
      menuMap.set(menuId, {
        title: row.menunombre,
        menuPath: row.menu_path || null,
        order: row.menu_orden || 999, // fallback en caso de que falte
        items: [],
      });
    }

    if (row.submenuid && row.submenunombre && row.path) {
      menuMap.get(menuId)!.items.push({
        title: row.submenunombre,
        path: row.path,
        order: row.sub_menu_orden || 999,
      });
    }
  }

  const sortedMenus = Array.from(menuMap.values())
    .map((menu) => ({
      ...menu,
      items: menu.items.sort((a, b) => a.order - b.order), // ordenar submenús
    }))
    .sort((a, b) => a.order - b.order); // ordenar menús

  return sortedMenus;
}

export function sanitizeCurrencyInput(val: unknown): number | undefined {
  if (typeof val !== "string" && typeof val !== "number") return undefined;
  const cleaned = String(val).replace(/^\$/, "").trim();
  const num = parseFloat(cleaned);
  const res = isNaN(num) ? undefined : num;
  return res;
}
export const errorMsgRequired = (field: string) => {
  return `El campo ${field} es obligatorio`;
};
export const errorMsgTypeData = (field: string) => {
  return `${field}: Tipo de dato incorrecto`;
};
