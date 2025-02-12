import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
/* Components */
import Loader from "@shared/components/ui/Loader/Loader";
import Button from "@shared/components/ui/Button/Button";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useInstitutionForm } from "@shared/hooks/useInstitutionForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
/* Utils */
import { formatDate } from "@shared/utils/globals.util";
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
/* Config */
import { OTHER_INSTITUTION_LABEL, OTHER_INSTITUTION_VALUE } from "@config/constants/variables";
/* Models */
import { IBaseOptionGI } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { IExperienceUniversityPost } from "../models/experience-university.model";
/* Schemas */
import { experienceUniversitySchema, type ExperienceUniversitySchemaType } from "../schemas/experience-university.validation";
/* Services */
import { experienceUnivesityService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  id            ?: number | null;
  legGradoTitulo?: ILegGradoTitulo[];
}


const ModalExperienceUniversity = ({ showModal, onClose, legGradoTitulo, id }: Props) => {
  const queryClient = useQueryClient();
  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(experienceUniversitySchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Obtener el título académico
  const { data: experienceUniversity, isLoading: loadExperience, isError: errorExperience } = useQuery({
    queryKey: ["experienceUniversity", id],
    queryFn : async () => {
      if (id) {
        const response = await experienceUnivesityService.getExperienceUniversity(id);
        return response;
      }
    },
    enabled: !!id,
  });

  const { data: dedicationRegime, isLoading: isLoadingDedicationRegime } = useQuery({
    queryKey: ["dedicationRegime"],
    queryFn: async () => {
      const response = await experienceUnivesityService.getDedicationRegime();
      return response;
    },
  });

  const { data: teachingCategory, isLoading: isLoadingTeachingCategory } = useQuery({
    queryKey: ["teachingCategory"],
    queryFn: async () => {
      const response = await experienceUnivesityService.getTeachingCategory();
      return response;
    },
  });

  const optionsDedicationRegime = formatToOptions(dedicationRegime || []);
  const optionsTeachingCategory = formatToOptions(teachingCategory || []);

  const { mutate: registerExperience, isPending: isSubmitting } = useMutation({
    mutationFn: async (dataMapper: IExperienceUniversityPost) => {
      const dataFilter = legGradoTitulo?.[0];
      if (!dataFilter) return;
      const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

      if (id) {
        await experienceUnivesityService.updateDegreeTitle(id, dataMapper);
      } else {
        await experienceUnivesityService.registerExperienceUniversity(nLegGraDatCodigo, dataMapper);
      }

    },
    onSuccess: () => {
      const dataFilter = legGradoTitulo?.[0];
      if (dataFilter) {
        queryClient.invalidateQueries({ queryKey: ["experiencesUniversity", dataFilter.nLegGraDatCodigo] });
      }

      if (id) {
        showNotification("success", "Experiencia Universitaria actualizado correctamente.")
      } else {
        showNotification("success", "Experiencia Universitaria registrado correctamente.")
      }
      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  useEffect(() => {
    if (experienceUniversity || experienceUniversity !== undefined) {
      const country = options.nationality.filter(item => item.value === Number(experienceUniversity.cLegDocPais));
      const countryData: IBaseOptionGI = country[0];
      
      // cargar datos
      if (countryData !== undefined) {
        setValue("vPais", { value: +countryData.value, label: countryData.label });
      }
      
      if (experienceUniversity.cLegDocUniversidad.trim() === OTHER_INSTITUTION_VALUE) {
        setValue("cLegGraInstitucion", { value: experienceUniversity.cLegDocUniversidad.toString().trim(), label: OTHER_INSTITUTION_LABEL });
      } else {
        setValue("cLegGraInstitucion", { value: experienceUniversity.cLegDocUniversidadNavigation.cPerCodigo, label: experienceUniversity.cLegDocUniversidadNavigation.cPerNombre });
      }
      
      setValue("cLegGraOtraInst", experienceUniversity.cLegDocOtraInst);
      setValue("lRegimenDed", { value: experienceUniversity.vRegimen.nConCodigo, label: experienceUniversity.vRegimen.cConDescripcion });
      setValue("lCategoriaDoc", { value: experienceUniversity.vCategoria.nConValor, label: experienceUniversity.vCategoria.cConDescripcion });
      setValue("dateFecIni", new Date(experienceUniversity.dLegDocFechaFin));
      setValue("dateFecFin", new Date(experienceUniversity.dLegDocFechaInicio));
    }
  }, [experienceUniversity, setValue, options.nationality]);

  const onSubmit = async (data: ExperienceUniversitySchemaType) => {
    const dataFilter = legGradoTitulo?.[0];
    if (!dataFilter) return;

    const regime   = dedicationRegime?.filter(item => item.nConValor === data.lRegimenDed.value);
    const category = teachingCategory?.filter(item => item.nConValor === data.lCategoriaDoc.value);

    if (!regime || !category) return;

    const regimeData   = regime?.[0]!;
    const categoryData = category?.[0]!;

    const dataMapper: IExperienceUniversityPost = {
      nLegDocCodigo     : id ?? undefined,
      nLegDocRegimen    : regimeData.nConCodigo,
      nValorRegimen     : regimeData.nConValor,
      nLegDocCategoria  : categoryData.nConCodigo,
      nValorCategoria   : categoryData.nConValor,
      cLegDocUniversidad: data.cLegGraInstitucion.value,
      cLegDocPais       : data.vPais.value.toString(),
      cLegDocOtraInst   : data.cLegGraOtraInst,
      dLegDocFechaInicio: formatDate(data.dateFecIni, "short", "-"),
      dLegDocFechaFin   : formatDate(data.dateFecFin, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegDocValida     : "false",
      cLegDocEstado     : "true",
    };

    registerExperience(dataMapper);
  };
  

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Docencia Universitaria">
      {
        errorExperience ? (
          <AlertMessage variant="error" title="Error al cargar la experiencia universitaria." />
        ) : (
          <>
            {
              loadExperience ? (
                <Loader />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
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
                    {String(watch("cLegGraInstitucion.value")) === "PER100" && (
                      <InputField
                        label="Nombre de Institución"
                        register={register}
                        name="cLegGraOtraInst"
                        error={errors.cLegGraOtraInst}
                        placeholder="Ingrese el nombre de institución"
                      />
                    )}
                    <ReactSelect
                      label="Régimen Dedicación"
                      name="lRegimenDed"
                      control={control}
                      options={optionsDedicationRegime}
                      placeholder="Seleccione un régimen"
                      errorMessage={errors.lRegimenDed?.message}
                      isLoading={isLoadingDedicationRegime}
                    />
                    <ReactSelect
                      label="Cargo"
                      name="lCategoriaDoc"
                      control={control}
                      options={optionsTeachingCategory}
                      placeholder="Seleccione un Cargo"
                      errorMessage={errors.lCategoriaDoc?.message}
                      isLoading={isLoadingTeachingCategory}
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
                    { isSubmitting ? "Guardando..." : "Guardar" }
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

export default ModalExperienceUniversity;