import { SFormProductoData } from "@/components/inventario/Render/schemaFormProducto";
import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Producto } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const productosApi = {
  fetchProductoById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from("producto")
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
  fetchProductosList: async () => {
    try {
      const { data, error } = await supabase
        .from("producto")
        .select("*")
        .is("deleted_at", null)
        .order("nombre", { ascending: true });
      if (error) errorApiSupabase(error);
      return data as Producto[];
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      return [];
    }
  },

  createProducto: async (producto: SFormProductoData) => {
    try {
      const { error, status } = await supabase
        .from("producto")
        .insert([producto])
        .select();

      if (error) errorApiSupabase(error);
      return status === 201 ? true : false;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return null;
    }
  },
  updateProducto: async ({
    producto,
    id,
  }: {
    producto: SFormProductoData;
    id: number;
  }) => {
    try {
      const { error, status } = await supabase
        .from("producto")
        .update(producto)
        .eq("id", id)
        .select();

      if (error) errorApiSupabase(error);
      return status === 200 ? true : false;
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return null;
    }
  },
  deleteProducto: async (id: number) => {
    try {
      const { error, status } = await supabase
        .from("producto")
        .delete()
        .eq("id", id);
      if (error) errorApiSupabase(error);
      return status === 200 ? true : false;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return null;
    }
  },
};
