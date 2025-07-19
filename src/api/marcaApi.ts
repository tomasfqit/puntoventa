import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Marca } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const marcaApi = {
  fetchMarcaById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("marca")
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
  fetchMarcasList: async () => {
    try {
      const { data, error } = await supabase
        .from("marca")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Marca[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
