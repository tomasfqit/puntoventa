import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Menu } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const menuApi = {
  fetchMenuUsuario: async (userId: number) => {
    try {
      const { data, error } = await supabase
        .from("vista_menu_usuario")
        .select("*")
        .eq("usuario_id", userId);
      if (error) errorApiSupabase(error);
      const menuItems = obtenerMenuItems(data || []);
      return menuItems;
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
  fetchMenus: async () => {
    try {
      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order("grupo_id", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Menu[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
