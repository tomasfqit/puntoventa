import z from "zod";
export const formClienteSchema = z.object({
  nombres: z
    .string()
    .min(1, "El nombre es requerido")
    .transform((val) => val.toUpperCase()),

  apellidos: z
    .string()
    .min(1, "El apellido es requerido")
    .transform((val) => val.toUpperCase()),

  identificacion: z.string().min(1, "La identificación es requerida"),

  telefono: z.string().optional(),

  correo: z.string().email("El correo no es válido").optional(),

  direccion: z
    .string()
    .optional()
    .transform((val) => (val || "")?.toUpperCase()),

  cliente: z.object({
    persona_id: z.number().optional(),
    tipo_cliente: z
      .string()
      .min(1, "El tipo de cliente es requerido")
      .transform((val) => val.toUpperCase()),
  }),
});
