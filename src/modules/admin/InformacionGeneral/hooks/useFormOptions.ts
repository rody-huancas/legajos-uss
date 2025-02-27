import { useMemo } from "react";
import { useCountries } from "./useCountries";
import { formatToOptions } from "../utils";
import { useAcademicDegree, useMaritalStatus, useDocumentIdentity, useSexo, useLanguage, useZoneType, useStreetType, useLanguageLevel, useOfficeSkills, useInformatic, useAcademicPositions } from "./useInformationGeneral";

export const useFormOptions = () => {
  const { nationalities, departments, isLoading: isLoadingCountries } = useCountries();

  const { data: academicDegree   , isLoading: isLoadingAcademicDegree    } = useAcademicDegree();
  const { data: maritalStatus    , isLoading: isLoadingMarital           } = useMaritalStatus();
  const { data: documentIdentity , isLoading: isLoadingDocuments         } = useDocumentIdentity();
  const { data: sexo             , isLoading: isLoadingSexo              } = useSexo();
  const { data: languages        , isLoading: isLoadingLanguage          } = useLanguage();
  const { data: zoneTypes        , isLoading: isLoadingZoneType          } = useZoneType();
  const { data: streetType       , isLoading: isLoadingStreetType        } = useStreetType();
  const { data: languageLevel    , isLoading: isLoadingLanguageLevel     } = useLanguageLevel();
  const { data: officeSkills     , isLoading: isLoadingOfficeSkills      } = useOfficeSkills();
  const { data: informatic       , isLoading: isLoadingInformatic        } = useInformatic();
  const { data: academicPositions, isLoading: isLoadingAcademicPositions } = useAcademicPositions();



  const options = useMemo(
    () => ({
      academicDegree   : formatToOptions(academicDegree),
      nationality      : formatToOptions(nationalities),
      departments      : formatToOptions(departments),
      documentIdentity : formatToOptions(documentIdentity),
      maritalStatus    : formatToOptions(maritalStatus),
      sexo             : formatToOptions(sexo),
      languages        : formatToOptions(languages),
      zoneTypes        : formatToOptions(zoneTypes),
      streetType       : formatToOptions(streetType),
      languageLevel    : formatToOptions(languageLevel),
      officeSkills     : formatToOptions(officeSkills),
      informatic       : formatToOptions(informatic),
      academicPositions: formatToOptions(academicPositions),

      // Datos sin formatear (raw)
      raw: {
        academicDegree,
        nationalities,
        departments,
        documentIdentity,
        maritalStatus,
        sexo,
        languages,
        zoneTypes,
        streetType,
        languageLevel,
        officeSkills,
        informatic,
        academicPositions
      },
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
      languageLevel,
      officeSkills,
      informatic,
      academicPositions
    ]
  );

  const loadingStates = {
    nationality      : isLoadingCountries,
    departments      : isLoadingCountries,
    academicDegree   : isLoadingAcademicDegree,
    maritalStatus    : isLoadingMarital,
    documentIdentity : isLoadingDocuments,
    sexo             : isLoadingSexo,
    languages        : isLoadingLanguage,
    zoneTypes        : isLoadingZoneType,
    streetType       : isLoadingStreetType,
    languageLevel    : isLoadingLanguageLevel,
    officeSkills     : isLoadingOfficeSkills,
    informatic       : isLoadingInformatic,
    academicPositions: isLoadingAcademicPositions,
  };

  return {
    options,
    loadingStates
  };
};
