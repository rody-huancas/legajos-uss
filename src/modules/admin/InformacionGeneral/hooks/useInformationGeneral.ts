import { useQuery } from "@tanstack/react-query";
import { IInterface, IConstante } from "../models/information-general.model";
import { informationGeneralService } from "../services";

// Grado Académico
export const useAcademicDegree = () => {
  return useQuery<IInterface[] | undefined, Error>({
    queryKey: ["academicDegree"],
    queryFn: () => informationGeneralService.getAcademicDegree(),
  });
};

// Documento de identidad
export const useDocumentIdentity = () => {
  return useQuery<IInterface[] | undefined, Error>({
    queryKey: ["documentIdentity"],
    queryFn: () => informationGeneralService.getDocumentIdentity(),
  });
};

// Estado Civil
export const useMaritalStatus = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["maritalStatus"],
    queryFn: () => informationGeneralService.getMaritalStatus(),
  });
};

// Sexo
export const useSexo = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["sexo"],
    queryFn: () => informationGeneralService.getSexo(),
  });
};

// Tipo de Zona
export const useZoneType = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["zoneType"],
    queryFn: () => informationGeneralService.getZoneType(),
  });
};

// Tipo de Calle
export const useStreetType = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["streetType"],
    queryFn: () => informationGeneralService.getStreetType(),
  });
};

// Idiomas
export const useLanguage = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["languages"],
    queryFn: () => informationGeneralService.getLanguage(),
  });
};

// Nivel de Idioma
export const useLanguageLevel = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["languageLevel"],
    queryFn: () => informationGeneralService.getLanguageProficiency(),
  });
};

// Habilidad Ofimática
export const useOfficeSkills = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["officeSkills"],
    queryFn: () => informationGeneralService.getOfficeSkills(),
  });
};

// Opciones Informática
export const useInformatic = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["informatic"],
    queryFn: () => informationGeneralService.getInformatic(),
  });
};

// Cargos Académicos
export const useAcademicPositions = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["academicPositions"],
    queryFn: () => informationGeneralService.getAcademicPositions(),
  });
};

// Reconocimientos
export const useRecognitions = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["recognitions"],
    queryFn: () => informationGeneralService.getRecognitions(),
  });
};

// Documentos de Reconocimiento
export const useRecognitionDocuments = () => {
  return useQuery<IConstante[] | undefined, Error>({
    queryKey: ["recognitionDocuments"],
    queryFn: () => informationGeneralService.getRecognitionDocuments(),
  });
};
