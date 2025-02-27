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
import { INoTeachigProfessionalExperiencePost } from "../models/no-teaching-profesional-exprience.model";
  /* Config */
import { OTHER_INSTITUTION_LABEL, OTHER_INSTITUTION_VALUE } from "@config/constants/variables";
/* Models */
import { IBaseOptionGI } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { noTeachingProfessionalExperienceService } from "../services";
import { noTeachingProfessionalExperienceSchema, NoTeachingProfessionalExperienceSchemaType } from "../schemas/teaching-dedication-regime.validation";
/* Services */
import { experienceUnivesityService } from "../../experiencia-docencia-universitaria/services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  id            ?: number | null;
  legGradoTitulo?: ILegGradoTitulo[];
}

const ModalNoTeachingProfessionalExperience = ({ showModal, onClose, legGradoTitulo, id }: Props) => {
  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;
  const dataFilter       = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(noTeachingProfessionalExperienceSchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Obtener el régimen dedicación docente
  const { data: noTeachingProfessionalExperienceData, isLoading: isLoadingNoTeachingProfessionalExperience, isError: isErrorNoTeachingProfessionalExperience } = useQuery({
    queryKey: ["noTeachingProfessionalExperience", nLegGraDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await noTeachingProfessionalExperienceService.getNoTeachingProfessionalExperience(id);
        return response;
      }
    },
    enabled: !!id,
  });

    // Opciones régimen dedicación
  const { data: dedicationRegime, isLoading: isLoadingDedicationRegime } = useQuery({
    queryKey: ["dedicationRegime"],
    queryFn : async () => {
      const response = await experienceUnivesityService.getDedicationRegime();
      return response;
    },
  });

  const optionsDedicationRegime = formatToOptions(dedicationRegime || []);

  // Cargar la data para editar
  useEffect(() => {
    if (id) {
      if (noTeachingProfessionalExperienceData || noTeachingProfessionalExperienceData !== undefined) {
        const country = options.nationality.filter(item => item.value === Number(noTeachingProfessionalExperienceData.cLegProPais));
        const countryData: IBaseOptionGI = country[0];
        if (countryData !== undefined) {
          setValue("vPais", { value: +countryData.value, label: countryData.label });
        }
        if (noTeachingProfessionalExperienceData.cLegProInstitucion.trim() === OTHER_INSTITUTION_VALUE) {
          setValue("cLegGraInstitucion", { value: noTeachingProfessionalExperienceData.cLegProInstitucion.toString().trim(), label: OTHER_INSTITUTION_LABEL });
        } else {
          setValue("cLegGraInstitucion", { value: noTeachingProfessionalExperienceData.cLegProInstitucionNavigation.cPerApellido, label: noTeachingProfessionalExperienceData.cLegProInstitucionNavigation.cPerNombre });
        }
        setValue("cLegGraOtraInst", noTeachingProfessionalExperienceData.cLegProOtraInst);
        setValue("cLegProCargoProf", noTeachingProfessionalExperienceData.cLegProCargoProf);
        setValue("vCargo", { value: noTeachingProfessionalExperienceData.vCargo.nConValor, label: noTeachingProfessionalExperienceData.vCargo.cConDescripcion });
        setValue("dateFecIni", new Date(noTeachingProfessionalExperienceData.dLegProFechaInicio));
        setValue("dateFecFin", new Date(noTeachingProfessionalExperienceData.dLegProFechaFin));
      }
    }
  }, [noTeachingProfessionalExperienceData, setValue, options.nationality]);

  const { mutate: registerTeachingDedicationRegime, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: INoTeachigProfessionalExperiencePost) => {
      if (id) {
        await noTeachingProfessionalExperienceService.updateNoTeachingProfessionalExperience(id, data);
      } else {
        await noTeachingProfessionalExperienceService.registerNoTeachingProfessionalExperience(nLegGraDatCodigo, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noTeachingProfessionalExperience", nLegGraDatCodigo] });
      if (id) showNotification("success", "La Experiencia Profesional no Docente se ha actualizado correctamente.");
      else showNotification("success", "La Experiencia Profesional no Docente se ha registrado correctamente.");
      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: NoTeachingProfessionalExperienceSchemaType) => {
    const cargo = dedicationRegime?.filter(
      (item) => item.nConValor === data.vCargo.value
    );
    if (!cargo) return;

    const cargoData = cargo[0];

    const dataMapper: INoTeachigProfessionalExperiencePost = {
      nLegProCodigo     : id ?? undefined,
      cLegProInstitucion: data.cLegGraInstitucion.value,
      cLegProPais       : data.vPais.value.toString(),
      cLegProCargoProf  : data.cLegProCargoProf,
      cLegProOtraInst   : data.cLegGraOtraInst ?? "",
      nLegProCargo      : cargoData.nConCodigo,
      nValorCargo       : cargoData.nConValor,
      dLegProFechaInicio: formatDate(data.dateFecIni, "short", "-"),
      dLegProFechaFin   : formatDate(data.dateFecFin, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegProValida     : "false",
      cLegProEstado     : "true",
    };

    registerTeachingDedicationRegime(dataMapper);
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Experiencia Profesional no Docente">
      {
        isErrorNoTeachingProfessionalExperience ? (
          <AlertMessage variant="error" title="Error al cargar la experiencia profesional no docente." />
        ) : (
          <>
            {
              isLoadingNoTeachingProfessionalExperience ? (
                <Loader />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  <div className="space-y-5">
                    <ReactSelect
                      label        = "País"
                      name         = "vPais"
                      control      = {control}
                      options      = {options.nationality}
                      placeholder  = "Seleccione un país"
                      errorMessage = {errors.vPais?.message}
                      isLoading    = {loadingStates.nationality}
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

                    {String(watch("cLegGraInstitucion.value")) === OTHER_INSTITUTION_VALUE && (
                      <InputField
                        label       = "Nombre de Institución"
                        register    = {register}
                        name        = "cLegGraOtraInst"
                        error       = {errors.cLegGraOtraInst}
                        placeholder = "Ingrese el nombre de institución"
                      />
                    )}

                    <ReactSelect
                      label        = "Régimen Dedicación"
                      name         = "vCargo"
                      control      = {control}
                      options      = {optionsDedicationRegime}
                      placeholder  = "Seleccione un régimen"
                      errorMessage = {errors.vCargo?.message}
                      isLoading    = {isLoadingDedicationRegime}
                    />

                    <InputField
                      label       = "Cargo"
                      register    = {register}
                      name        = "cLegProCargoProf"
                      error       = {errors.cLegProCargoProf}
                      placeholder = "Ingrese el cargo"
                    />

                    <InputDatePicker
                      control = {control}
                      name    = "dateFecIni"
                      label   = "Fecha Inicio"
                      required
                      errorMessage = {errors.dateFecIni?.message}
                    />

                    <InputDatePicker
                      control = {control}
                      name    = "dateFecFin"
                      label   = "Fecha Fin"
                      required
                      errorMessage = {errors.dateFecFin?.message}
                    />

                    <FileUploader
                      name              = "cLegDocArchivo"
                      title             = "Adjuntar archivo (PNG, JPG, JPEG, PDF)"
                      acceptedFileTypes = "image/*, application/pdf"
                      setValue          = {setValue}
                      error             = {errors.cLegDocArchivo?.message}
                    />
                  </div>

                  <Button type="submit" className="gap-2" disabled={isSubmitting}>
                  <LuSaveAll size = {16} />
                    {isSubmitting ? "Guardando..." : "Guardar"}
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

export default ModalNoTeachingProfessionalExperience;
