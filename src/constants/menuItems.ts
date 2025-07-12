import { Home, LucideProps, Package, Users } from "lucide-react";

export interface SidebarProps {
  isOpen: boolean;
}

export interface SubMenuItem {
  title: string;
  path: string;
}

export interface MenuItem {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  submenu?: SubMenuItem[];
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}
export const menuData: MenuGroup[] = [
  {
    title: "Principal",
    items: [
      {
        title: "Inicio",
        icon: Home,
        path: "/home",
      },
    ],
  },
  {
    title: "Inventario",
    items: [
      {
        title: "Productos",
        icon: Package,
        path: "/productos",
        submenu: [
          {
            title: "Lista de Productos",
            path: "/products",
          },
          {
            title: "Categorías",
            path: "/categories",
          },
        ],
      },
      {
        title: "Bodegas",
        icon: Package,
        path: "/bodegas",
        submenu: [
          {
            title: "Lista de Bodegas",
            path: "/bodegas",
          },
        ],
      },
    ],
  },
  {
    title: "Usuarios",
    items: [
      {
        title: "Lista de Usuarios",
        icon: Users,
        path: "/users",
        submenu: [
          {
            title: "Lista de Usuarios",
            path: "/users/list",
          },
        ],
      },
    ],
  },
];
