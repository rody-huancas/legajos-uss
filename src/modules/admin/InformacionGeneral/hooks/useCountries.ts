import { useQuery } from "@tanstack/react-query";
import { informationGeneralService } from "../services";

export const useCountries = () => {
  const fetchCountries = async () => {
    const data = await informationGeneralService.getCountries();

    const filteredUbigeo  = data?.filter((x) => x.nIntCodigo !== 0) || [];
    const departmentData  = filteredUbigeo.filter((x) => x.cIntJerarquia.trim().length === 2);
    const nationalityData = filteredUbigeo.filter((x) => x.cIntJerarquia.trim().length === 3);

    return {
      ubigeo       : filteredUbigeo,
      departments  : departmentData,
      nationalities: nationalityData,
      countries    : [...nationalityData],
    };
  };

  const { data: countriesData, isLoading, isError, error } = useQuery({
    queryKey            : ["countries"],
    queryFn             : fetchCountries,
    retry               : 1,
    refetchOnWindowFocus: false,
  });

  const { ubigeo = [], departments = [], nationalities = [], countries = [] } = countriesData || {};

  return {
    ubigeo,
    departments,
    nationalities,
    countries,
    isLoading,
    isError,
    error,
  };
};
