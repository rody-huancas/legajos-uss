import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { IPersona, IInterface } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { IRegisterDegreesTitle } from "../models/degrees-title.model";
import { degreesTitleSchema, DegreesTitleSchemaType } from "../schemas/degrees-titles.validation";
/* Utils */
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
import { showNotification } from "@shared/utils/notification.util";
import { handleAxiosError } from "@shared/utils/axios.util";
/* Services */
import { degreesTitleService } from "../services";
import { informationGeneralService } from "@modules/admin/InformacionGeneral/services";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
/* Icons */
import { LuSaveAll } from "react-icons/lu";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  legGradoTitulo?: ILegGradoTitulo[];
  id?            : number | null;
}

const ModalDegreesTitle = (props: Props) => {
  const { showModal, onClose, legGradoTitulo, id } = props;

  // hooks
  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(degreesTitleSchema);

  // states
  const [page, setPage]                         = useState(1);
  const [institutions, setInstitutions]         = useState<IPersona[] | undefined>([]);
  const [allInstitutions, setAllInstitutions]   = useState<IPersona[]>([]);
  const [loadInstitutions, setLoadInstitutions] = useState<boolean>(false);
  const [academics, setAcademics]               = useState<IInterface[] | undefined>([]);

  // query
  const queryClient = useQueryClient();

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

  // effects
  useEffect(() => {
    if (degreeTitle) {
      setValue("vPais", { value: degreeTitle.vPais.nIntCodigo, label: degreeTitle.vPais.cIntDescripcion });
      if (id && degreeTitle.cLegGraOtraInst !== "") {
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

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoadInstitutions(true);
      const response = await informationGeneralService.getInstitution();

      let data: IPersona[] | undefined = [];

      if (watch("vPais.label") !== "PERU") {
        const otraInstitucion: IPersona = { cPerCodigo: "PER100", cPerNombre: "OTRA INSTITUCIÓN" };
        data = [otraInstitucion, ...(data || [])];
      } else {
        data = response?.filter((item) => item.cUbigeoCodigo!.length > 3);
      }

      setAllInstitutions(data || []);
      setInstitutions(data?.slice(0, 100) || []);
      setLoadInstitutions(false);
    };
    fetchInstitutions();
  }, [watch("vPais")]);

  useEffect(() => {
    if (String(watch("cLegGraInstitucion.value")) !== "PER100") {
      setValue("cLegGraOtraInst", watch("cLegGraInstitucion.label"));
    }
  }, [watch("cLegGraInstitucion")]);

  useEffect(() => {
    const fetchAcademics = async () => {
      const response = await informationGeneralService.getAcademicDegree();
      setAcademics(response);
    };
    fetchAcademics();
  }, []);

  const academicDegreeOptions = formatToOptions(academics);

  const loadMoreInstitutions = () => {
    const nextPage   = page + 1;
    const startIndex = (nextPage - 1) * 100;
    const endIndex   = nextPage * 100;

    const moreInstitutions = allInstitutions.slice(startIndex, endIndex);
    setInstitutions((prev) => [...prev!, ...moreInstitutions]);
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
  
      onClose();
  
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
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Grado y Título">
      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            {
              isError ? (
                <AlertMessage variant="error" title="No se pudo cargar los datos." />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  <div className="space-y-5">
                    <ReactSelect
                      label="País" name="vPais" control={control} options={options.nationality} placeholder="Seleccione un país" errorMessage={errors.vPais?.message} isLoading={loadingStates.nationality}
                      defaultValue={degreeTitle?.vPais ? { value: +degreeTitle.vPais.nIntCodigo || "", label: degreeTitle.vPais.cIntDescripcion || "" } : undefined }
                    />

                    <ReactSelect
                      label                = "Institución"
                      name                 = "cLegGraInstitucion"
                      control              = {control}
                      options              = {formatToOptions(institutions)}
                      placeholder          = "Seleccione una institución"
                      errorMessage         = {errors.cLegGraInstitucion?.message}
                      isLoading            = {loadInstitutions}
                      onMenuScrollToBottom = {loadMoreInstitutions}
                      onInputChange        = {handleSearch}
                      filterOption         = {() => true}
                    />

                    {String(watch("cLegGraInstitucion.value")) === "PER100" && (
                      <InputField
                        label="Nombre de Institución" register={register} name="cLegGraOtraInst" error={errors.cLegGraOtraInst} placeholder="Ingrese el nombre de institución"
                      />
                    )}

                    <ReactSelect
                      label="Grado Académico" name="vGradoAcad" control={control} options={academicDegreeOptions} placeholder="Seleccione un grado académico" errorMessage={errors.vGradoAcad?.message}
                    />

                    <InputField
                      label="Mención en" register={register} name="cLegGraCarreraProf" error={errors.cLegGraCarreraProf} placeholder="Ingrese la mención en..."
                    />

                    <InputDatePicker
                      control={control} name="dLegGraFecha" label="Fecha de obtención" required errorMessage={errors.dLegGraFecha?.message}
                    />

                    <FileUploader
                      name="cLegGraArchivo" title="Adjuntar archivo (PNG, JPG, JPEG, PDF)" acceptedFileTypes="image/*, application/pdf" setValue={setValue} error={errors.cLegGraArchivo?.message}
                    />
                  </div>

                  <Button type="submit" className="gap-2" disabled={isSubmitting}>
                    <LuSaveAll size={16} /> {isSubmitting ? "Guardando..." : "Guardar"}
                  </Button>
                </form>
              )
            }
          </>
        )
      }
    </ModalContainer>
  );
};

export default ModalDegreesTitle;