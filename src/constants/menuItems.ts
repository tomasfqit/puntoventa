export interface SidebarProps {
  isOpen: boolean;
}

export interface SubMenuItem {
  title: string;
  path: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  iconName?: string; // Optional icon name for localStorage serialization
  path: string;
  submenu?: SubMenuItem[];
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

// types.ts
export type FlatMenuItem = {
  rolid: number;
  rolmenuid: number;
  menuid: number;
  submenuid: number;
  menunombre: string;
  submenunombre: string;
  rolnombre: string;
  path: string;
  usuario_id: number;
};

export interface NestedMenuItem {
  title: string;
  items: {
    title: string;
    path: string;
  }[];
}
