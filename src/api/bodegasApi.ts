import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Bodega } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const bodegaApi = {
  fetchBodegaById: async (id: number) => {
    const { data, error } = await supabase
      .from("bodega")
      .select("*")
      .eq("id", id);
    if (error) errorApiSupabase(error);
    const menuItems = obtenerMenuItems(data || []);
    return menuItems;
  },
  fetchBodegasList: async () => {
    const { data, error } = await supabase
      .from("bodega")
      .select("*")
      .is("deleted_at", null)
      .order("nombre", { ascending: true });
    if (error) errorApiSupabase(error);
    return data as Bodega[];
  },

  createBodega: async (bodega: Bodega) => {
    const { error, status } = await supabase
      .from("bodega")
      .insert([bodega])
      .select();

    if (error) errorApiSupabase(error);
    return status === 201 ? true : false;
  },
  updateBodega: async ({ bodega, id }: { bodega: Bodega; id: number }) => {
    const { error, status } = await supabase
      .from("bodega")
      .update(bodega)
      .eq("id", id)
      .select();

    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
  deleteBodega: async (id: number) => {
    const { error, status } = await supabase
      .from("bodega")
      .delete()
      .eq("id", id);
    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
};
