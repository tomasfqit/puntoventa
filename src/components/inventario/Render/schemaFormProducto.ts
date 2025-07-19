import z from "zod";

// Form data type for Producto form
export type SFormProductoData = {
  id?: number;
  marca_id: number;
  categoria_id: number;
  modelo_id: number;
  nombre: string;
  precio_venta: number;
  precio_compra: number;
  stock: number;
  descripcion?: string;
};

// Zod schema for Producto form validation
export const formProductoSchema = z.object({
  marca_id: z.number().min(1, "La marca es requerida"),
  categoria_id: z.number().min(1, "La categoría es requerida"),
  modelo_id: z.number().min(1, "El modelo es requerido"),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  precio_venta: z
    .number({
      error: "El precio de venta debe ser un número",
    })
    .pipe(z.number().min(0, "El precio es requerido")),
  precio_compra: z
    .number({
      error: "El precio de compra debe ser un número",
    })
    .pipe(z.number().min(0, "El precio es requerido")),
  stock: z.number().min(0, "El stock es requerido"),
  descripcion: z.string().optional(),
});
