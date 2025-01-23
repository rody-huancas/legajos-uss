import { z } from "zod";
import { REQUIRED_FIELD } from "@config/constants/messageValidation";

export const legajoDataSchema = z.object({
  nLegDatPais           : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Nacionalidad") }),
  cLegDatNroDoc         : z.string().min(1, { message: REQUIRED_FIELD("Número de Documento") }),
  vTipoDoc              : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Tipo Documento") }),
  cLegDatApellidoPaterno: z.string().min(1, { message: REQUIRED_FIELD("Apellido Paterno") }),
  cLegDatApellidoMaterno: z.string().min(1, { message: REQUIRED_FIELD("Apellido Materno") }),
  cLegDatNombres        : z.string().min(1, { message: REQUIRED_FIELD("Nombres") }),
  dLegDatFechaNacimiento: z.date({ required_error: REQUIRED_FIELD("Fecha de Nacimiento"), invalid_type_error: REQUIRED_FIELD("Fecha de Nacimiento") }),
  vEstadoCivil          : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Estado Civil") }),
  vSexo                 : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Sexo") }),
  cLegDatEmail          : z.string().email({ message: "E-mail no válido" }).min(1, { message: REQUIRED_FIELD("E-mail") }),
  cLegDatMovil          : z.string().min(1, { message: REQUIRED_FIELD("Móvil") }),
  cLegDatTelefono       : z.string().min(1, { message: REQUIRED_FIELD("Teléfono") }),
  vGradoAcad            : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Grado Académico") }),
  vIdiomaNativo         : z.object({ value: z.number(), label: z.string() }).optional().refine((val) => val !== undefined, { message: REQUIRED_FIELD("Idioma Nativo") }),
  vZona                 : z.object({ value: z.number(), label: z.string() }).optional(),
  vTipoDomicilio        : z.object({ value: z.number(), label: z.string() }).optional(),
  cLegDatCalleDomicilio : z.string().optional(),
  cLegDatNroDomicilio   : z.string().optional(),
  cLegDatDptoDomicilio  : z.string().optional(),
  cLegDatMzaDomicilio   : z.string().optional(),
  cLegDatLtDomicilio    : z.string().optional(),
  cLegDatReferencia     : z.string().optional(),
  
  //! Revisar si son correctos los campos
  dptodomic             : z.object({ value: z.number(), label: z.string() }).optional(),
  provdomic             : z.object({ value: z.number(), label: z.string() }).optional(),
  distdomic             : z.object({ value: z.number(), label: z.string() }).optional(),
  
  paisNac               : z.object({ value: z.number(), label: z.string() }).optional(),
  departamentoNac       : z.object({ value: z.number(), label: z.string() }).optional(),
  provinciaNac          : z.object({ value: z.number(), label: z.string() }).optional(),
  distritoNac           : z.object({ value: z.number(), label: z.string() }).optional(),
  // -------------------------------------








  // nLegDatCodigo         : z.number({ required_error: REQUIRED_FIELD("Código") }),
  // nLegDatTipoDoc        : z.number({ required_error: REQUIRED_FIELD("Tipo de Documento") }),
  // nClaseTipoDoc         : z.number({ required_error: REQUIRED_FIELD("Clase Tipo Documento") }),
 
  // nLegDatSexo           : z.number({ required_error: REQUIRED_FIELD("Sexo") }),
  // nClaseSexo            : z.number({ required_error: REQUIRED_FIELD("Clase Sexo") }),
  // nLegDatEstadoCivil    : z.number({ required_error: REQUIRED_FIELD("Estado Civil") }),
  // nClaseEstadoCivil     : z.number({ required_error: REQUIRED_FIELD("Clase Estado Civil") }),
  // string                : z.string().min(1, { message: REQUIRED_FIELD("String") }),
  // cLegDatFoto           : z.string().min(1, { message: REQUIRED_FIELD("Foto") }),
  // stringFirma           : z.string().min(1, { message: REQUIRED_FIELD("String Firma") }),
  // cLegDatFirma          : z.string().min(1, { message: REQUIRED_FIELD("Firma") }),
  // stringSunedu          : z.string().min(1, { message: REQUIRED_FIELD("String Sunedu") }),
  // cLegDatSunedu         : z.string().min(1, { message: REQUIRED_FIELD("Sunedu") }),
  // stringPolicial        : z.string().min(1, { message: REQUIRED_FIELD("String Policial") }),
  // cLegDatPolicial       : z.string().min(1, { message: REQUIRED_FIELD("Policial") }),
  // stringJudicial        : z.string().min(1, { message: REQUIRED_FIELD("String Judicial") }),
  // stringBuenaSalud      : z.string().min(1, { message: REQUIRED_FIELD("String Buena Salud") }),
  // declaracionjuradaflag : z.boolean({ required_error: REQUIRED_FIELD("Declaración Jurada Flag") }),
  // fechadeclaracionjurada: z.coerce
  //                           .date({ required_error: REQUIRED_FIELD("Fecha Declaración Jurada") })
  //                           .refine((date) => !isNaN(date.getTime()), { message: "La fecha de declaración jurada no es válida" }),
  // nLegIdiomaNativo          : z.number({ required_error: REQUIRED_FIELD("Idioma Nativo") }),
  // cLegDatBuenaSalud         : z.string().min(1, { message: REQUIRED_FIELD("Buena Salud") }),
  // cLegDatJudicial           : z.string().min(1, { message: REQUIRED_FIELD("Judicial") }),
  // nLegDatGradoAcad          : z.number({ required_error: REQUIRED_FIELD("Grado Académico") }),
  // nClaseGradoAcad           : z.number({ required_error: REQUIRED_FIELD("Clase Grado Académico") }),
  
  // nClasePais                : z.number({ required_error: REQUIRED_FIELD("Clase País") }),
  // cLegDatAcerca             : z.string().min(1, { message: REQUIRED_FIELD("Acerca") }),
  // nLegDatZona               : z.number({ required_error: REQUIRED_FIELD("Zona") }),
  // nValorZona                : z.number({ required_error: REQUIRED_FIELD("Valor Zona") }),
  // nLegDatTipoDomicilio      : z.number({ required_error: REQUIRED_FIELD("Tipo Domicilio") }),
  // nValorTipoDomicilio       : z.number({ required_error: REQUIRED_FIELD("Valor Tipo Domicilio") }),
  // nLetDatUbigeo             : z.number({ required_error: REQUIRED_FIELD("Ubigeo") }),
  // nClaseUbigeo              : z.number({ required_error: REQUIRED_FIELD("Clase Ubigeo") }),
  // nLetDatNacimiento         : z.number({ required_error: REQUIRED_FIELD("Nacimiento") }),
  // nClaseNacimiento          : z.number({ required_error: REQUIRED_FIELD("Clase Nacimiento") }),
  // cLegDatColegioProf        : z.string().min(1, { message: REQUIRED_FIELD("Colegio Profesional") }),
  // cLegDatNroColegiatura     : z.string().min(1, { message: REQUIRED_FIELD("Número Colegiatura") }),
  // nLegDatCondicionColeg     : z.number({ required_error: REQUIRED_FIELD("Condición Colegiatura") }),
  // nValorCondicionColeg      : z.number({ required_error: REQUIRED_FIELD("Valor Condición Colegiatura") }),
  // dLegDatosFechaEmisionColeg: z.coerce
  //                               .date({ required_error: REQUIRED_FIELD("Fecha Emisión Colegiatura") })
  //                               .refine((date) => !isNaN(date.getTime()), { message: "La fecha de emisión de colegiatura no es válida" }),
  // dLegDatosFechaExpiraColeg: z.coerce
  //                               .date({ required_error: REQUIRED_FIELD("Fecha Expiración Colegiatura") })
  //                               .refine((date) => !isNaN(date.getTime()), { message: "La fecha de expiración de colegiatura no es válida" }),
  // cLegDatEstado : z.boolean({ required_error: REQUIRED_FIELD("Estado") }),
  // cPerCodigo    : z.string().min(1, { message: REQUIRED_FIELD("Código Personal") }),
  // cUsuRegistro  : z.string().min(1, { message: REQUIRED_FIELD("Usuario Registro") }),
  // dFechaRegistro: z.coerce
  //                   .date({ required_error: REQUIRED_FIELD("Fecha Registro") })
  //                   .refine((date) => !isNaN(date.getTime()), { message: "La fecha de registro no es válida" }),
  // cUsuModifica  : z.string().min(1, { message: REQUIRED_FIELD("Usuario Modifica") }),
  // dFechaModifica: z.coerce
  //                   .date({ required_error: REQUIRED_FIELD("Fecha Modifica") })
  //                   .refine((date) => !isNaN(date.getTime()), { message: "La fecha de modificación no es válida" }),
});

export type LegajoDataSchemaType = z.infer<typeof legajoDataSchema>;