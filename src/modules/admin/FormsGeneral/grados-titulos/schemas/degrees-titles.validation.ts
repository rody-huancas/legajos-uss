import { z } from "zod";
import { REQUIRED_FIELD } from "@config/constants/messageValidation";

export const degreesTitleSchema = z.object({
  vPais             : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("País") }),
  cLegGraInstitucion: z.object({ value: z.string(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Institución") }),
  vGradoAcad        : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Grado Acedémico") }),
  cLegGraCarreraProf: z.string().min(1, { message: REQUIRED_FIELD("Mención En") }),
  cLegGraOtraInst   : z.string().min(1, { message: REQUIRED_FIELD("Nombre de Institución") }),
  dLegGraFecha      : z.date({ required_error: REQUIRED_FIELD("Fecha de Obtención"), invalid_type_error: REQUIRED_FIELD("Fecha de Obtención") }),
  cLegGraArchivo    : z
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

export type DegreesTitleSchemaType = z.infer<typeof degreesTitleSchema>;
