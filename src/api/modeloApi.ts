import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Modelo } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const modeloApi = {
  fetchModeloById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("modelo")
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
  fetchModeloList: async () => {
    try {
      const { data, error } = await supabase
        .from("modelo")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Modelo[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
