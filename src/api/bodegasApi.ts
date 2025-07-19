import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Bodega } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const bodegaApi = {
  fetchBodegaById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("bodega")
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
  fetchBodegasList: async () => {
    try {
      const { data, error } = await supabase
        .from("bodega")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Bodega[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },

  createBodega: async (bodega: Bodega) => {
    try {
      const { error, status } = await supabase
        .from("bodega")
        .insert([bodega])
        .select();

      if (error) errorApiSupabase(error);
      return status === 201 ? true : false;
    } catch (error) {
      console.error("Error al crear la bodega:", error);
      return null;
    }
  },
  updateBodega: async ({ bodega, id }: { bodega: Bodega; id: number }) => {
    try {
      const { error, status } = await supabase
        .from("bodega")
        .update(bodega)
        .eq("id", id)
        .select();

      if (error) errorApiSupabase(error);
      return status === 200 ? true : false;
    } catch (error) {
      console.error("Error al crear la bodega:", error);
      return null;
    }
  },
  deleteBodega: async (id: number) => {
    try {
      const { error, status } = await supabase
        .from("bodega")
        .delete()
        .eq("id", id);
      if (error) errorApiSupabase(error);
      return status === 200 ? true : false;
    } catch (error) {
      console.error("Error al eliminar la bodega:", error);
      return null;
    }
  },
};
