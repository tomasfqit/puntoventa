import { SFormProductoData } from "@/components/inventario/Render/schemaFormProducto";
import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Producto } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const productosApi = {
  fetchProductoById: async (id: number) => {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .eq("id", id);
    if (error) errorApiSupabase(error);
    const menuItems = obtenerMenuItems(data || []);
    return menuItems;
  },
  fetchProductosList: async () => {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .is("deleted_at", null)
      .order("nombre", { ascending: true });
    if (error) errorApiSupabase(error);
    return data as Producto[];
  },

  createProducto: async (producto: SFormProductoData) => {
    const { error, status } = await supabase
      .from("producto")
      .insert([producto])
      .select();

    if (error) errorApiSupabase(error);
    return status === 201 ? true : false;
  },
  updateProducto: async ({
    producto,
    id,
  }: {
    producto: SFormProductoData;
    id: number;
  }) => {
    const { error, status } = await supabase
      .from("producto")
      .update(producto)
      .eq("id", id)
      .select();

    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
  deleteProducto: async (id: number) => {
    const { error, status } = await supabase
      .from("producto")
      .delete()
      .eq("id", id);
    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
};
