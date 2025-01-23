import { useState, useEffect } from "react";
import { informationGeneralService } from "../services";
import { IInterface } from "../models/information-general.model";

export const useCountries = () => {
  const [ubigeo, setUbigeo]               = useState<IInterface[]>([]);
  const [departments, setDepartments]     = useState<IInterface[]>([]);
  const [nationalities, setNationalities] = useState<IInterface[]>([]);
  const [countries, setCountries]         = useState<IInterface[]>([]);
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
