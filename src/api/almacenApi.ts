import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Almacen } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const almacenApi = {
  fetchAlmacenById: async (id: number) => {
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
  fetchAlmacenesList: async () => {
    try {
      const { data, error } = await supabase
        .from("bodega")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Almacen[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },

  createAlmacen: async (almacen: Almacen) => {
    try {
      const { error, status } = await supabase
        .from("almacen")
        .insert([almacen])
        .select();

      if (error) errorApiSupabase(error);
      return status === 201 ? true : false;
    } catch (error) {
      console.error("Error al crear la bodega:", error);
      return null;
    }
  },
  updateAlmacen: async ({ almacen, id }: { almacen: Almacen; id: number }) => {
    try {
      const { error, status } = await supabase
        .from("almacen")
        .update(almacen)
        .eq("id", id)
        .select();

      if (error) errorApiSupabase(error);
      return status === 200 ? true : false;
    } catch (error) {
      console.error("Error al crear la bodega:", error);
      return null;
    }
  },
  deleteAlmacen: async (id: number) => {
    try {
      const { error, status } = await supabase
        .from("almacen")
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
