import z from "zod";

// Zod schema for Producto form validation
export const formClienteSchema = z.object({
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "El apellido es requerido"),
  identificacion: z.string().min(1, "La identificación es requerida"),
  telefono: z.string().optional(),
  correo: z.string().optional(),
  direccion: z.string().optional(),
  cliente: z.object({
    persona_id: z.number().optional(),
    tipo_cliente: z.string().min(1, "El tipo de cliente es requerido"),
  }),
});
