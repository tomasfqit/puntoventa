import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Almacen } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const almacenApi = {
  fetchAlmacenById: async (id: number) => {
    const { data, error } = await supabase
      .from("bodega")
      .select("*")
      .eq("id", id);
    if (error) errorApiSupabase(error);
    const menuItems = obtenerMenuItems(data || []);
    return menuItems;
  },
  fetchAlmacenesList: async () => {
    const { data, error } = await supabase
      .from("almacen")
      .select("*")
      .is("deleted_at", null)
      .order("nombre", { ascending: true });
    if (error) errorApiSupabase(error);
    return data as Almacen[];
  },

  createAlmacen: async (almacen: Almacen) => {
    const { error, status } = await supabase
      .from("almacen")
      .insert([almacen])
      .select();

    if (error) errorApiSupabase(error);
    return status === 201 ? true : false;
  },
  updateAlmacen: async ({ almacen, id }: { almacen: Almacen; id: number }) => {
    const { error, status } = await supabase
      .from("almacen")
      .update(almacen)
      .eq("id", id)
      .select();

    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
  deleteAlmacen: async (id: number) => {
    const { error, status } = await supabase
      .from("almacen")
      .delete()
      .eq("id", id);
    if (error) throw new Error(error.message);
    return status === 204 ? true : false;
  },
};
