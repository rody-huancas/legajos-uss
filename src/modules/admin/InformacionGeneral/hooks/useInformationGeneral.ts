import { useFetchData } from "@shared/hooks/useFetchData";
import { IInterface, IConstante } from "../models/information-general.model";
import { informationGeneralService } from "../services";

// Grado Académico
export const useAcademicDegree = () => {
  return useFetchData<IInterface[] | undefined>(() =>
    informationGeneralService.getAcademicDegree()
  );
};

// Documento de identidad
export const useDocumentIdentity = () => {
  return useFetchData<IInterface[] | undefined>(() =>
    informationGeneralService.getDocumentIdentity()
  );
};

// Estado Civil
export const useMaritalStatus = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getMaritalStatus()
  );
};

// Sexo
export const useSexo = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getSexo()
  );
};

// Tipo de Zona
export const useZoneType = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getZoneType()
  );
};

// Tipo de Calle
export const useStreetType = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getStreetType()
  );
};

// Idiomas
export const useLanguage = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getLanguage()
  );
};

// Nivel de Idioma
export const useLanguageLevel = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getLanguageProficiency()
  );
};

// Habilidad Ofimática
export const useOfficeSkills = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getOfficeSkills()
  );
}

// Opciones Onformática
export const useInformatic = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getInformatic()
  );
}
