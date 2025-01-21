import { useFetchData } from "@shared/hooks/useFetchData";
import { IInterface, IConstante } from "../models/information-general.model";
import { informationGeneralService } from "../services";

export const useAcademicDegree = () => {
  return useFetchData<IInterface[] | undefined>(() =>
    informationGeneralService.getAcademicDegree()
  );
};

export const useDocumentIdentity = () => {
  return useFetchData<IInterface[] | undefined>(() =>
    informationGeneralService.getDocumentIdentity()
  );
};

export const useMaritalStatus = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getMaritalStatus()
  );
};

export const useSexo = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getSexo()
  );
};

export const useLanguage = () => {
  return useFetchData<IConstante[] | undefined>(() =>
    informationGeneralService.getLanguage()
  );
};
