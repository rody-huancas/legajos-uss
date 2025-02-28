import { z } from "zod";
import { REQUIRED_FIELD } from "@config/constants/messageValidation";

export const projectionSocialSchema = z.object({
  vPais              : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("País") }),
  cLegProyInstitucion: z.object({ value: z.string(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Institución") }),
  vParticipacion     : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Participación") }),
  cLegProyProyecto   : z.string().min(1, { message: REQUIRED_FIELD("Proyecto") }),
  cLegProyOtraInst   : z.string().min(1, { message: REQUIRED_FIELD("Nombre de Institución") }),
  dateFechaInicio    : z.date({ required_error: REQUIRED_FIELD("Fecha Inicio"), invalid_type_error: REQUIRED_FIELD("Fecha Inicio") }),
  dateFechaFin       : z.date({ required_error: REQUIRED_FIELD("Fecha Fin"), invalid_type_error: REQUIRED_FIELD("Fecha Fin") }),
  cLegDocArchivo     : z
    .union([
      z
        .instanceof(File, { message: "Debe ser un archivo válido" })
        .refine(
          (file) =>
            file.type === "application/pdf" ||
            file.type === "image/png"       ||
            file.type === "image/jpg"       ||
            file.type === "image/jpeg",
          {
            message: "Solo se permiten archivos PDF, PNG, JPG o JPEG",
          }
        ),
      z.null(),
    ])
    .optional(),
});

export type ProjectionSocialType = z.infer<typeof projectionSocialSchema>;