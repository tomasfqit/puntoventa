import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Menu } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const productosApi = {
  fetchProductoById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .eq("id", id);
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
