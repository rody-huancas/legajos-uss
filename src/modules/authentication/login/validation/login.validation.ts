import { z } from "zod";

export const loginSchema = z.object({
  pcPerUsuCodigo: z.string().min(1, { message: "El nombre de usuario es obligatorio" }),
  pcPerUsuClave : z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;