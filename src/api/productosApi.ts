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
  createProducto: async ({
    producto,
    bodega_id,
    cantidad,
  }: {
    producto: SFormProductoData;
    bodega_id: number;
    cantidad: number;
  }) => {
    const { ...productoData } = producto;

    // 1. Insertar el producto
    const { data: productoInsertado, error: errorProducto } = await supabase
      .from("producto")
      .insert([productoData])
      .select()
      .single();

    if (errorProducto) {
      errorApiSupabase(errorProducto);
      return false;
    }

    const producto_id = productoInsertado.id;

    // 2. Verificar si ya existe en inventario esa combinación producto-bodega
    const { data: inventarioExistente, error: errorInventarioConsulta } =
      await supabase
        .from("inventario")
        .select("id, cantidad")
        .eq("producto_id", producto_id)
        .eq("bodega_id", bodega_id)
        .maybeSingle();

    if (errorInventarioConsulta) {
      errorApiSupabase(errorInventarioConsulta);
      return false;
    }

    if (inventarioExistente) {
      // Ya existe → sumar la cantidad
      const nuevaCantidad = inventarioExistente.cantidad + cantidad;

      const { error: errorUpdate } = await supabase
        .from("inventario")
        .update({ cantidad: nuevaCantidad })
        .eq("id", inventarioExistente.id);

      if (errorUpdate) {
        errorApiSupabase(errorUpdate);
        return false;
      }
    } else {
      // No existe → insertar nuevo registro
      const { error: errorInsert } = await supabase.from("inventario").insert([
        {
          producto_id,
          bodega_id,
          cantidad,
        },
      ]);

      if (errorInsert) {
        errorApiSupabase(errorInsert);
        return false;
      }
    }

    // 3. Actualizar el stock total del producto sumando todas las bodegas
    const { data: totalStockData, error: errorSum } = await supabase
      .from("inventario")
      .select("cantidad")
      .eq("producto_id", producto_id);

    if (errorSum) {
      errorApiSupabase(errorSum);
      return false;
    }

    const totalStock = totalStockData.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );

    const { error: errorStockUpdate } = await supabase
      .from("producto")
      .update({ stock: totalStock })
      .eq("id", producto_id);

    if (errorStockUpdate) {
      errorApiSupabase(errorStockUpdate);
      return false;
    }

    return true;
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
