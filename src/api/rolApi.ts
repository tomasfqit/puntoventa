import { errorApiSupabase } from "@/helpers";
import { IDBTableRol } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const rolApi = {
  fetchRolList: async () => {
    try {
      const { data, error } = await supabase
        .from("rol")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as IDBTableRol[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },
  createRol: async (rol: IDBTableRol) => {
    const { error, status } = await supabase.from("rol").insert(rol);
    if (error) errorApiSupabase(error);
    return status === 201 ? true : false;
  },
  deleteRol: async (id: number) => {
    const { error, status } = await supabase.from("rol").delete().eq("id", id);
    if (error) errorApiSupabase(error);
    return status === 204 ? true : false;
  },
};
