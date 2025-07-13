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
