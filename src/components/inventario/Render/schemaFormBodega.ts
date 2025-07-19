import z from "zod";

// Zod schema for Producto form validation
export const formBodegaSchema = z.object({
  id: z.number().optional(),
  almacen_id: z.number().min(1, "El almacen es requerido"),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
});
