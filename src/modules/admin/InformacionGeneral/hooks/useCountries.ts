import { useState, useEffect } from "react";
import { informationGeneralService } from "../services";
import { ICountries } from "../models/information-general.model";

export const useCountries = () => {
  const [ubigeo, setUbigeo]               = useState<ICountries[]>([]);
  const [departments, setDepartments]     = useState<ICountries[]>([]);
  const [nationalities, setNationalities] = useState<ICountries[]>([]);
  const [countries, setCountries]         = useState<ICountries[]>([]);
  const [isLoading, setIsLoading]         = useState<boolean>(true);
  
  const fetchCountries = async () => {
    try {
      setIsLoading(true);
      const data = await informationGeneralService.getCountries();

      const filteredUbigeo = data?.filter((x) => x.nIntCodigo !== 0) || [];
      setUbigeo(filteredUbigeo);

      const departmentData = filteredUbigeo.filter((x) => x.cIntJerarquia.trim().length === 2);
      setDepartments(departmentData);

      const nationalityData = filteredUbigeo.filter((x) => x.cIntJerarquia.trim().length === 3);
      setNationalities(nationalityData);

      setCountries([...nationalityData]);
    } catch (err) {
      console.error("Error al obtener los países:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { ubigeo, departments, nationalities, countries, isLoading };
};
