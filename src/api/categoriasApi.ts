import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Categoria } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const categoriasApi = {
  fetchCategoriaById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("categoria")
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
  fetchCategoriaList: async () => {
    try {
      const { data, error } = await supabase
        .from("categoria")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Categoria[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
