import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { supabase } from "@/lib/supabaseClient";

export const fetchMenu = async (userId: number) => {
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
};
