import { useMemo } from "react";
import { useCountries } from "./useCountries";
import { formatToOptions } from "../utils";
import { useAcademicDegree, useMaritalStatus, useDocumentIdentity, useSexo, useLanguage, useZoneType, useStreetType } from "./useInformationGeneral";

export const useFormOptions = () => {
  const { nationalities, departments, isLoading: isLoadingCountries } = useCountries();

  const { data: academicDegree  , isLoading: isLoadingAcademicDegree } = useAcademicDegree();
  const { data: maritalStatus   , isLoading: isLoadingMarital        } = useMaritalStatus();
  const { data: documentIdentity, isLoading: isLoadingDocuments      } = useDocumentIdentity();
  const { data: sexo            , isLoading: isLoadingSexo           } = useSexo();
  const { data: languages       , isLoading: isLoadingLanguage       } = useLanguage();
  const { data: zoneTypes       , isLoading: isLoadingZoneType       } = useZoneType();
  const { data: streetType      , isLoading: isLoadingStreetType     } = useStreetType();

  const options = useMemo(
    () => ({
      academicDegree  : formatToOptions(academicDegree),
      nationality     : formatToOptions(nationalities),
      departments     : formatToOptions(departments),
      documentIdentity: formatToOptions(documentIdentity),
      maritalStatus   : formatToOptions(maritalStatus),
      sexo            : formatToOptions(sexo),
      languages       : formatToOptions(languages),
      zoneTypes       : formatToOptions(zoneTypes),
      streetType      : formatToOptions(streetType),
    }),
    [
      academicDegree,
      nationalities,
      departments,
      documentIdentity,
      maritalStatus,
      sexo,
      languages,
      zoneTypes,
      streetType,
    ]
  );

  const loadingStates = {
    nationality     : isLoadingCountries,
    departments     : isLoadingCountries,
    academicDegree  : isLoadingAcademicDegree,
    maritalStatus   : isLoadingMarital,
    documentIdentity: isLoadingDocuments,
    sexo            : isLoadingSexo,
    languages       : isLoadingLanguage,
    zoneTypes       : isLoadingZoneType,
    streetType      : isLoadingStreetType
  };

  return {
    options,
    loadingStates
  };
};
