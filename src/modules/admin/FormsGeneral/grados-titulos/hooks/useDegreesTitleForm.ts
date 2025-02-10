import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { degreesTitleService } from "../services";
import { IRegisterDegreesTitle } from "../models/degrees-title.model";
import { degreesTitleSchema, DegreesTitleSchemaType } from "../schemas/degrees-titles.validation";
import { useZodForm } from "@shared/hooks/useZodForm";
import { showNotification } from "@shared/utils/notification.util";
import { handleAxiosError } from "@shared/utils/axios.util";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
import { IPersona, IInterface } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { informationGeneralService } from "@modules/admin/InformacionGeneral/services";

interface UseDegreesTitleFormProps {
  legGradoTitulo?: ILegGradoTitulo[];
  id            ?: number | null;
  onClose        : () => void;
}

export const useDegreesTitleForm = ({ legGradoTitulo, id, onClose }: UseDegreesTitleFormProps) => {
  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(degreesTitleSchema);
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<IPersona[] | undefined>([]);
  const [allInstitutions, setAllInstitutions] = useState<IPersona[]>([]);
  const [loadInstitutions, setLoadInstitutions] = useState<boolean>(false);
  const [academics, setAcademics] = useState<IInterface[] | undefined>([]);
  const queryClient = useQueryClient();

    // Obtener el título académico
  const { data: degreeTitle, isLoading, isError } = useQuery({
    queryKey: ["degreeTitle", id],
    queryFn : async () => {
      if (id) {
        const response = await degreesTitleService.getDegreeTitle(id);
        return response;
      }
    },
    enabled: !!id,
  });

    // Establecer valores iniciales del formulario
  useEffect(() => {
    if (degreeTitle) {
      setValue("vPais", { value: degreeTitle.vPais.nIntCodigo, label: degreeTitle.vPais.cIntDescripcion });
      if (degreeTitle.cLegGraInstitucion.trim() === "PER100") {
        setValue("cLegGraInstitucion", { value: degreeTitle.cLegGraInstitucion.toString().trim(), label: "OTRA INSTITUCIÓN" });
      } else {
        setValue("cLegGraInstitucion", { value: degreeTitle.cLegGraInstitucionNavigation.cPerCodigo, label: degreeTitle.cLegGraInstitucionNavigation.cPerNombre });
      }
      setValue("vGradoAcad", { value: degreeTitle.vGradoAcad.nIntCodigo, label: degreeTitle.vGradoAcad.cIntDescripcion });
      setValue("cLegGraCarreraProf", degreeTitle.cLegGraCarreraProf);
      setValue("cLegGraOtraInst", degreeTitle.cLegGraOtraInst);
      setValue("dLegGraFecha", new Date(degreeTitle.dLegGraFecha));
    }
  }, [degreeTitle, setValue]);

    // Cargar instituciones
  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoadInstitutions(true);
      const response = await informationGeneralService.getInstitution();

      let data: IPersona[] | undefined = [];

      if (watch("vPais.label") !== "PERU") {
        const otraInstitucion: IPersona = { cPerCodigo: "PER100", cPerNombre: "OTRA INSTITUCIÓN" };
              data                      = [otraInstitucion, ...(data || [])];
      } else {
        data = response?.filter((item) => item.cUbigeoCodigo!.length > 3);
      }

      setAllInstitutions(data || []);
      setInstitutions(data?.slice(0, 100) || []);
      setLoadInstitutions(false);
    };
    fetchInstitutions();
  }, [watch("vPais")]);

    // Actualizar campo "cLegGraOtraInst"
  useEffect(() => {
    if (String(watch("cLegGraInstitucion.value")) !== "PER100") {
      setValue("cLegGraOtraInst", watch("cLegGraInstitucion.label"));
    }
  }, [watch("cLegGraInstitucion")]);

    // Cargar grados académicos
  useEffect(() => {
    const fetchAcademics = async () => {
      const response = await informationGeneralService.getAcademicDegree();
      setAcademics(response);
    };
    fetchAcademics();
  }, []);

    // Mutación para guardar o actualizar
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: DegreesTitleSchemaType) => {
      const dataFilter = legGradoTitulo?.[0];
      if (!dataFilter) return;

      const nLegGraCodigoTitulo = dataFilter.nLegGraDatCodigo;

      const dataMapped: IRegisterDegreesTitle = {
        NLegGraCodigo     : id ?? undefined,
        NLegGraGradoAcad  : dataFilter.nLegGraGradoAcad ?? 0,
        NClaseGradoAcad   : dataFilter.nClaseGradoAcad ?? 0,
        CLegGraCarreraProf: data.cLegGraCarreraProf ?? "",
        CLegGraInstitucion: data.cLegGraInstitucion?.value ?? '',
        CLegGraOtraInst   : data.cLegGraOtraInst,
        NLegGraPais       : data.vPais.value ?? 0,
        NClasePais        : dataFilter.nClasePais ?? 0,
        DLegGraFecha      : data.dLegGraFecha.toISOString().split('T')[0],
        cFile             : data.cLegGraArchivo ?? null,
        CLegGraValida     : false,
        CLegGraEstado     : true,
      };

      if (id) {
        await degreesTitleService.updateDegreeTitle(id, dataMapped);
      } else {
        await degreesTitleService.registerDegreeTitle(nLegGraCodigoTitulo, dataMapped);
      }
    },
    onSuccess: () => {
      if (id !== undefined) {
        showNotification("success", "Grado y título actualizado correctamente");
      } else {
        showNotification("success", "Grado y título registrado correctamente");
      }

      queryClient.invalidateQueries({
        queryKey: ["degreesTitle", legGradoTitulo?.[0]?.nLegGraDatCodigo],
      });
    },
    onError: (error) => {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar el grado y título.',
      });
    },
  });

  const onSubmit = (data: DegreesTitleSchemaType) => {
    mutate(data);
    onClose();
  };
  
  return {
    register,
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    institutions,
    loadInstitutions,
    academics,
    isLoading,
    isError,
    isSubmitting,
    onSubmit,
    options,
    loadingStates,
    loadMoreInstitutions: () => {
      const nextPage   = page + 1;
      const startIndex = (nextPage - 1) * 100;
      const endIndex   = nextPage * 100;

      const moreInstitutions = allInstitutions.slice(startIndex, endIndex);
      setInstitutions((prev) => [...prev!, ...moreInstitutions]);
      setPage(nextPage);
    },
    handleSearch: (inputValue: string) => {
      if (inputValue) {
        const filteredInstitutions = allInstitutions.filter((item) =>
          item.cPerNombre.toLowerCase().includes(inputValue.toLowerCase())
        );
        setInstitutions(filteredInstitutions.slice(0, 100));
      } else {
        setInstitutions(allInstitutions.slice(0, 100));
      }
    },
    academicDegreeOptions: formatToOptions(academics),
  };
};