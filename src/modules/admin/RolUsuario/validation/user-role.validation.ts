import { z } from "zod";

export const userRoleSchema = z.object({
  select: z
    .object({ value: z.string(), label: z.string() })
    .optional()
    .refine((val) => val !== undefined, { message: "Para continuar debe seleccionar un Perfil." }),
});

export type UserRoleSchemaType = z.infer<typeof userRoleSchema>;