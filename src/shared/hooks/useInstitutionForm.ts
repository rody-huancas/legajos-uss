import { useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch, FieldValues } from "react-hook-form";
import { IPersona } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { informationGeneralService } from "@modules/admin/InformacionGeneral/services";
import { OTHER_INSTITUTION_LABEL, OTHER_INSTITUTION_VALUE } from "@config/constants/variables";

interface UseInstitutionFormProps<T extends FieldValues> {
  countryFieldName         : string;
  institutionFieldName     : string;
  otherInstitutionFieldName: string;
  watch                    : UseFormWatch<T>;
  setValue                 : UseFormSetValue<T>;
}

export const useInstitutionForm = <T extends FieldValues>({
  countryFieldName,
  institutionFieldName,
  otherInstitutionFieldName,
  watch,
  setValue,
}: UseInstitutionFormProps<T>) => {
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<IPersona[]>([]);
  const [allInstitutions, setAllInstitutions] = useState<IPersona[]>([]);
  const [loadInstitutions, setLoadInstitutions] = useState<boolean>(false);

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoadInstitutions(true);
      const response = await informationGeneralService.getInstitution();

      let data: IPersona[] = [];

      if (watch(`${countryFieldName}.label` as any) !== "PERU") {
        const otraInstitucion: IPersona = { cPerCodigo: OTHER_INSTITUTION_VALUE, cPerNombre: OTHER_INSTITUTION_LABEL };
        data = [otraInstitucion, ...(data || [])];
      } else {
        data = response?.filter((item) => item.cUbigeoCodigo!.length > 3) || [];
      }

      setAllInstitutions(data);
      setInstitutions(data.slice(0, 100));
      setLoadInstitutions(false);
    };

    fetchInstitutions();
  }, [watch(countryFieldName as any)]);
 
  useEffect(() => {
    if (String(watch(`${institutionFieldName}.value` as any)) !== OTHER_INSTITUTION_VALUE) {
      setValue(otherInstitutionFieldName as any, watch(`${institutionFieldName}.label` as any));
    }
  }, [watch(institutionFieldName as any)]);

  const loadMoreInstitutions = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * 100;
    const endIndex = nextPage * 100;

    const moreInstitutions = allInstitutions.slice(startIndex, endIndex);
    setInstitutions((prev) => [...prev, ...moreInstitutions]);
    setPage(nextPage);
  };

 
  const handleSearch = (inputValue: string) => {
    if (inputValue) {
      const filteredInstitutions = allInstitutions.filter((item) =>
        item.cPerNombre.toLowerCase().includes(inputValue.toLowerCase())
      );
      setInstitutions(filteredInstitutions.slice(0, 100));
    } else {
      setInstitutions(allInstitutions.slice(0, 100));
    }
  };

  return {
    institutions,
    loadInstitutions,
    loadMoreInstitutions,
    handleSearch,
  };
};