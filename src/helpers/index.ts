import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  Home,
  LucideProps,
  Package,
  ShieldBan,
  Users,
  Warehouse,
} from "lucide-react";

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
