import z from "zod";

// Zod schema for Producto form validation
export const formAlmacenSchema = z.object({
  id: z.number().optional(),
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  direccion: z
    .string()
    .min(1, "La dirección es requerida")
    .max(100, "La dirección no puede exceder 100 caracteres"),
});
