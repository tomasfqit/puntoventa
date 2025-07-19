import { errorApiSupabase } from "@/helpers";
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
      return data;
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
        .is("deleted_at", null)
        .order("orden", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Menu[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
  fetchGrupoList: async () => {
    try {
      const { data, error } = await supabase
        .from("menu_grupo")
        .select("*")
        .is("deleted_at", null)
        .order("orden", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Menu[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
};
