import { z } from "zod";
import { REQUIRED_FIELD } from "@config/constants/messageValidation";

export const computerToolsSchema = z.object({
  vIdioma       : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Informática") }),
  vHabilidad    : z.object({ value: z.number(), label: z.string() }).optional(),
  vNivel        : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Nivel") }),
  dateFecCert   : z.date({ required_error: REQUIRED_FIELD("Fecha Certificación"), invalid_type_error: REQUIRED_FIELD("Fecha Certificación") }),
  cLegDocArchivo: z
    .union([
      z
        .instanceof(File, { message: "Debe ser un archivo válido" })
        .refine(
          (file) =>
            file.type === "application/pdf" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg",
          {
            message: "Solo se permiten archivos PDF, PNG, JPG o JPEG",
          }
        ),
      z.null(),
    ])
    .optional(),
});

export type ComputerToolsType = z.infer<typeof computerToolsSchema>;