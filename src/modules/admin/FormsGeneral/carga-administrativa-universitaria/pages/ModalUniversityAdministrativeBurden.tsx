import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import Loader from "@shared/components/ui/Loader/Loader";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
import { useInstitutionForm } from "@shared/hooks/useInstitutionForm";
/* Utils */
import { formatDate } from "@shared/utils/globals.util";
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
import { showNotification } from "@shared/utils/notification.util";
/* Config */
import { OTHER_INSTITUTION_LABEL, OTHER_INSTITUTION_VALUE } from "@config/constants/variables";
/* Models */
import { IGeneralProps } from "@shared/models/global.model";
import { IBaseOptionGI } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { IUniversityAdministrativeBurdenPost } from "../models/university-administrative-burden.model";
/* Schemas */
import { universityAdministrativeBurdenSchema, UniversityAdministrativeBurdenType } from "../schemas/university-administrative-burden.validation";
/* Services */
import { universityAdministrativeBurdenService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

const ModalUniversityAdministrativeBurden = ({ showModal, onClose, nLegDatCodigo, id }: IGeneralProps) => {
  if (!nLegDatCodigo) return;
  
  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(universityAdministrativeBurdenSchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Obtener la carga administrativa universitaria
  const { data: universityAdministrativeBurden, isLoading: isLoadingUniversityAdministrativeBurden, isError: isErrorUniversityAdministrativeBurden } = useQuery({
    queryKey: ["universityAdministrativeBurden", nLegDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await universityAdministrativeBurdenService.getUniversityAdministrativeBurden(id);
        return response;
      }
    },
    enabled: !!id,
  });

  // Cargar la data para editar
  useEffect(() => {
    if (id) {
      if (universityAdministrativeBurden || universityAdministrativeBurden !== undefined) {
        const country = options.nationality.filter(item => item.value === Number(universityAdministrativeBurden.cLegAdmPais));
        const countryData: IBaseOptionGI = country[0];
        
        if (countryData !== undefined) {
          setValue("vPais", { value: +countryData.value, label: countryData.label });
        }

        if (universityAdministrativeBurden.cLegAdmInstitucion.trim() === OTHER_INSTITUTION_VALUE) {
          setValue("cLegGraInstitucion", { value: universityAdministrativeBurden.cLegAdmInstitucion.toString().trim(), label: OTHER_INSTITUTION_LABEL });
        } else {
          if (universityAdministrativeBurden.cLegAdmInstitucionNavigation) {
            setValue("cLegGraInstitucion", { value: universityAdministrativeBurden.cLegAdmInstitucionNavigation.cPerCodigo, label: universityAdministrativeBurden.cLegAdmInstitucionNavigation.cPerNombre });
          }
        }
        
        setValue("cLegGraOtraInst", universityAdministrativeBurden.cLegAdmOtraInst);
        setValue("cLegGraDocument", universityAdministrativeBurden.cLegAdmDocumento);
        if (universityAdministrativeBurden.vCargo) {
          setValue("vCargo", { value: universityAdministrativeBurden.vCargo.nConValor, label: universityAdministrativeBurden.vCargo.cConDescripcion });
        }
        setValue("dateFecIni", new Date(universityAdministrativeBurden.dLegAdmFechaInicio));
        setValue("dateFecFin", new Date(universityAdministrativeBurden.dLegAdmFechaFin));
      }
    }
  }, [universityAdministrativeBurden, setValue, options.nationality]);
  
  const { mutate: registerUniversityAdministrativeBurden, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: IUniversityAdministrativeBurdenPost) => {
      if (id) await universityAdministrativeBurdenService.updateUniversityAdministrativeBurden(id, data)
      else await universityAdministrativeBurdenService.registerUniversityAdministrativeBurden(nLegDatCodigo, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universitiesAdministrativeBurden", nLegDatCodigo] });
  
      if (id) showNotification("success", "Régimen Dedicación Docente actualizado correctamente.");
      else showNotification("success", "Régimen Dedicación Docente registrado correctamente.");

      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: UniversityAdministrativeBurdenType) => {
    const academicPositions = options.raw.academicPositions?.filter(item => item.nConValor === data.vCargo.value);
    if (!academicPositions) return;
    
    const academicPositionsData   = academicPositions[0];

    const dataMapper: IUniversityAdministrativeBurdenPost = {
      nLegAdmCodigo     : id ?? undefined,
      cLegAdmInstitucion: data.cLegGraInstitucion.value,
      cLegAdmPais       : data.vPais.value.toString(),
      cLegAdmOtraInst   : data.cLegGraInstitucion.value === OTHER_INSTITUTION_VALUE ? data.cLegGraOtraInst : "",
      cLegAdmDocumento  : data.cLegGraDocument,
      nLegAdmCargo      : academicPositionsData.nConCodigo,
      nClaseCargo       : academicPositionsData.nConValor,
      dLegAdmFechaInicio: formatDate(data.dateFecIni, "short", "-"),
      dLegAdmFechaFin   : formatDate(data.dateFecFin, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegAdmValida     : "false",
      cLegAdmEstado     : "true",
    };
  console.log(dataMapper)
    registerUniversityAdministrativeBurden(dataMapper);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleSubmit(onSubmit)();
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Carga Administrativa Universitaria">
      {
        isErrorUniversityAdministrativeBurden ? (
          <AlertMessage variant="error" title="Error al cargar la carga administrativa universitaria" />
        ) : isLoadingUniversityAdministrativeBurden ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmitForm} className="space-y-7">
            <div className="space-y-5">
              <ReactSelect
                label="País"
                name="vPais"
                control={control}
                options={options.nationality}
                placeholder="Seleccione un país"
                errorMessage={errors.vPais?.message}
                isLoading={loadingStates.nationality}
              />

              <ReactSelect
                label="Institución"
                name="cLegGraInstitucion"
                control={control}
                options={formatToOptions(institutions)}
                placeholder="Seleccione una institución"
                errorMessage={errors.cLegGraInstitucion?.message}
                isLoading={loadInstitutions}
                onMenuScrollToBottom={loadMoreInstitutions}
                onInputChange={handleSearch}
                filterOption={() => true}
              />

              {String(watch("cLegGraInstitucion.value")) === OTHER_INSTITUTION_VALUE && (
                <InputField
                  label="Nombre de Institución"
                  register={register}
                  name="cLegGraOtraInst"
                  error={errors.cLegGraOtraInst}
                  placeholder="Ingrese el nombre de institución"
                />
              )}

              <ReactSelect
                label="Cargo"
                name="vCargo"
                control={control}
                options={options.academicPositions}
                placeholder="Seleccione un Cargo"
                errorMessage={errors.vCargo?.message}
                isLoading={loadingStates.academicPositions}
              />

              <InputField
                label="Documento"
                register={register}
                name="cLegGraDocument"
                error={errors.cLegGraDocument}
                placeholder="Ingrese el documento"
              />

              <InputDatePicker
                control={control}
                name="dateFecIni"
                label="Fecha Inicio"
                required
                errorMessage={errors.dateFecIni?.message}
              />

              <InputDatePicker
                control={control}
                name="dateFecFin"
                label="Fecha Fin"
                required
                errorMessage={errors.dateFecFin?.message}
              />

              <FileUploader
                name="cLegDocArchivo"
                title="Adjuntar archivo (PNG, JPG, JPEG, PDF)"
                acceptedFileTypes="image/*, application/pdf"
                setValue={setValue}
                error={errors.cLegDocArchivo?.message}
              />
            </div>

            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              <LuSaveAll size={16} />
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        )
      }
    </ModalContainer>
  );
};

export default ModalUniversityAdministrativeBurden;
