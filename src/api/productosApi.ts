import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Producto } from "@/interfaces/Table";
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
  fetchProductosList: async () => {
    try {
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Producto[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
