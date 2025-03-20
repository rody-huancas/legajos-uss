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
import { ISocialProjectionPost } from "../models/social-projection.model";
/* Schemas */
import { projectionSocialSchema, ProjectionSocialType } from "../schemas/social-projection.validation";
/* Services */
import { socialProjectionService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

const ModalSocialProjection = ({ showModal, onClose, nLegDatCodigo, id }: IGeneralProps) => {
  if (!nLegDatCodigo) return;

  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue, reset } = useZodForm(projectionSocialSchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegProyInstitucion",
    otherInstitutionFieldName: "cLegProyOtraInst",
    watch,
    setValue,
  });

  // Obtener la carga administrativa universitaria
  const { data: socialProjection, isLoading: isLoadingsocialProjection, isError: isErrorsocialProjection } = useQuery({
    queryKey: ["socialProjection", nLegDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await socialProjectionService.getSocialProjection(id);
        return response;
      }
    },
    enabled: !!id,
  });

  // Cargar la data para editar
  useEffect(() => {
    if (id) {
      if (socialProjection || socialProjection !== undefined) {
        const country = options.nationality.filter(item => item.value === Number(socialProjection.cLegProyPais));
        const countryData: IBaseOptionGI = country[0];
        
        if (countryData !== undefined) {
          setValue("vPais", { value: +countryData.value, label: countryData.label });
        }

        if (socialProjection.cLegProyInstitucion.trim() === OTHER_INSTITUTION_VALUE) {
          setValue("cLegProyInstitucion", { value: socialProjection.cLegProyInstitucion.toString().trim(), label: OTHER_INSTITUTION_LABEL });
        } else {
          if (socialProjection.cLegProyInstitucionNavigation) {
            setValue("cLegProyInstitucion", { value: socialProjection.cLegProyInstitucionNavigation.cPerCodigo, label: socialProjection.cLegProyInstitucionNavigation.cPerNombre });
          }
        }
        
        setValue("cLegProyProyecto", socialProjection.cLegProyDescripcion);
        setValue("cLegProyOtraInst", socialProjection.cLegProyOtraInst);
        if (socialProjection.vTipo) {
          setValue("vParticipacion", { value: socialProjection.vTipo.nConValor, label: socialProjection.vTipo.cConDescripcion });
        }
        setValue("dateFechaInicio", new Date(socialProjection.dLegProyFechaInicio));
        setValue("dateFechaFin", new Date(socialProjection.dLegProyFechaFin));
      }
    }
  }, [socialProjection, setValue, options.nationality]);
  
  const { mutate: registerSocialProjection, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: ISocialProjectionPost) => {
      if (id) await socialProjectionService.updateSocialProjection(id, data)
      else await socialProjectionService.registerSocialProjection(nLegDatCodigo, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialProjections", nLegDatCodigo] });
  
      if (id) showNotification("success", "Proyección social actualizado correctamente.");
      else showNotification("success", "Proyección social registrado correctamente.");

      reset()
      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: ProjectionSocialType) => {
    const participations = options.raw.participations?.filter(item => item.nConValor === data.vParticipacion.value);
    
    if (!participations) return;

    const participationsData = participations[0];

    const dataMapper: ISocialProjectionPost = {
      nLegProyCodigo     : id ?? undefined,
      cLegProyInstitucion: data.cLegProyInstitucion.value,
      cLegProyPais       : data.vPais.value.toString(),
      cLegProyOtraInst   : data.cLegProyInstitucion.value === OTHER_INSTITUTION_VALUE ? data.cLegProyOtraInst : "",
      cLegProyDescripcion: data.cLegProyProyecto,
      nLegProyTipo       : participationsData.nConCodigo,
      nValorTipo         : participationsData.nConValor,
      dLegProyFechaInicio: formatDate(data.dateFechaInicio),
      dLegProyFechaFin   : formatDate(data.dateFechaFin),
      cFile              : data.cLegDocArchivo,
      cLegProyValida     : "false",
      cLegProyEstado     : "true",
    };
  
    registerSocialProjection(dataMapper);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleSubmit(onSubmit)();
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Proyección Social">
      {
        isErrorsocialProjection ? (
          <AlertMessage variant="error" title="Error al cargar la proyección social" />
        ) : isLoadingsocialProjection ? (
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
                name="cLegProyInstitucion"
                control={control}
                options={formatToOptions(institutions)}
                placeholder="Seleccione una institución"
                errorMessage={errors.cLegProyInstitucion?.message}
                isLoading={loadInstitutions}
                onMenuScrollToBottom={loadMoreInstitutions}
                onInputChange={handleSearch}
                filterOption={() => true}
              />

              {String(watch("cLegProyInstitucion.value")) === OTHER_INSTITUTION_VALUE && (
                <InputField
                  label="Nombre de Institución"
                  register={register}
                  name="cLegProyOtraInst"
                  error={errors.cLegProyOtraInst}
                  placeholder="Ingrese el nombre de institución"
                />
              )}

              <InputField
                label="Proyecto"
                register={register}
                name="cLegProyProyecto"
                error={errors.cLegProyProyecto}
                placeholder="Ingrese el nombre del proyecto"
              />

              <ReactSelect
                label="Participación"
                name="vParticipacion"
                control={control}
                options={options.participations}
                placeholder="Seleccione una participación"
                errorMessage={errors.vParticipacion?.message}
                isLoading={loadingStates.participations}
              />

              <InputDatePicker
                control={control}
                name="dateFechaInicio"
                label="Fecha Inicio"
                required
                errorMessage={errors.dateFechaInicio?.message}
              />

              <InputDatePicker
                control={control}
                name="dateFechaFin"
                label="Fecha Fin"
                required
                errorMessage={errors.dateFechaFin?.message}
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

export default ModalSocialProjection;
