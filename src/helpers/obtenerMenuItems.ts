import { MenuGroup } from "@/constants/MenuItems";
import { Home } from "lucide-react";
import { iconMap } from ".";
type RawMenuRow = {
  usuario_id: number;
  rol: string;
  grupo_id: number;
  grupo: string;
  menu_id: number;
  menu: string;
  icono: string;
  menu_path: string;
  submenu_id: number;
  submenu: string;
  submenu_path: string;
};

export const obtenerMenuItems = (rows: RawMenuRow[]): MenuGroup[] => {
  const groupMap = new Map<number, MenuGroup>();

  for (const row of rows) {
    const groupId = row.grupo_id;

    if (!groupMap.has(groupId)) {
      groupMap.set(groupId, {
        title: row.grupo,
        items: [],
      });
    }

    const group = groupMap.get(groupId)!;

    let menu = group.items.find((m) => m.title === row.menu);

    // Crear el menú si no existe
    if (!menu) {
      menu = {
        title: row.menu,
        icon: iconMap[row.icono] || Home,
        path: row.menu_path,
        // Solo definir `submenu` si hay submenu_id
        ...(row.submenu_id ? { submenu: [] } : {}),
      };
      group.items.push(menu);
    }

    // Si tiene submenú, agregarlo
    if (row.submenu_id && menu.submenu) {
      const alreadyExists = menu.submenu.some(
        (s) => s.path === row.submenu_path
      );
      if (!alreadyExists) {
        menu.submenu.push({
          title: row.submenu,
          path: row.submenu_path,
        });
      }
    }
  }

  return Array.from(groupMap.values());
};
