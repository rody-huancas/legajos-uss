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
import { ITeachingDedicactionsRegimePost } from "../models/teaching-dedication-regime.model";
/* Schemas */
import { teachingDedicationRegimeSchema, TeachingDedicationRegimeType } from "../schemas/teaching-dedication-regime.validation";
/* Services */
import { experienceUnivesityService } from "../../experiencia-docencia-universitaria/services";
import { teachingDedicationRegimeService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

const ModalTeachingDedicationRegime = ({ showModal, onClose, legGradoTitulo, id }: IGeneralProps) => {
  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;
  const dataFilter = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;
  
  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(teachingDedicationRegimeSchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Obtener el régimen dedicación docente
  const { data: teachingDedicationRegimeData, isLoading: isLoadingTeachingDedicationRegime, isError: isErrorTeachingDedicationRegime } = useQuery({
    queryKey: ["teachingDedicationRegime", nLegGraDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await teachingDedicationRegimeService.getTeachingDedicationRegime(id);
        return response;
      }
    },
    enabled: !!id,
  });

  // Opciones régimen dedicación
  const { data: dedicationRegime, isLoading: isLoadingDedicationRegime } =
  useQuery({
    queryKey: ["dedicationRegime"],
    queryFn: async () => {
      const response = await experienceUnivesityService.getDedicationRegime();
      return response;
    },
  });

  const optionsDedicationRegime = formatToOptions(dedicationRegime || []);

  // Cargar la data para editar
  useEffect(() => {
    if (id) {
      if (teachingDedicationRegimeData || teachingDedicationRegimeData !== undefined) {
        const country = options.nationality.filter(item => item.value === Number(teachingDedicationRegimeData.cLegRegPais));
        const countryData: IBaseOptionGI = country[0];
        
        if (countryData !== undefined) {
          setValue("vPais", { value: +countryData.value, label: countryData.label });
        }

        if (teachingDedicationRegimeData.cLegCatInstitucion.trim() === OTHER_INSTITUTION_VALUE) {
          setValue("cLegGraInstitucion", { value: teachingDedicationRegimeData.cLegCatInstitucion.toString().trim(), label: OTHER_INSTITUTION_LABEL });
        } else {
          setValue("cLegGraInstitucion", { value: teachingDedicationRegimeData.cLegCatInstitucionNavigation.cPerApellido, label: teachingDedicationRegimeData.cLegCatInstitucionNavigation.cPerNombre });
        }
        
        setValue("cLegGraOtraInst", teachingDedicationRegimeData.cLegRegOtraInst);
        setValue("lRegimenDed", { value: teachingDedicationRegimeData.vDedicacion.nConValor, label: teachingDedicationRegimeData.vDedicacion.cConDescripcion });
        setValue("dateFecIni", new Date(teachingDedicationRegimeData.dLegRegFechaInicio));
        setValue("dateFecFin", new Date(teachingDedicationRegimeData.dLegRegFechaFin));
      }
    }
  }, [teachingDedicationRegimeData, setValue, options.nationality]);
  
  const { mutate: registerTeachingDedicationRegime, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: ITeachingDedicactionsRegimePost) => {
      if (id) {
        await teachingDedicationRegimeService.updateTeachingDedicationRegime(id, data)
      } else{
        await teachingDedicationRegimeService.registerTeachingDedicationRegime(nLegGraDatCodigo, data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachingDedicationRegime", nLegGraDatCodigo] });
  
      if (id) showNotification("success", "Régimen Dedicación Docente actualizado correctamente.");
      else showNotification("success", "Régimen Dedicación Docente registrado correctamente.");

      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: TeachingDedicationRegimeType) => {
    const regime = dedicationRegime?.filter((item) => item.nConValor === data.lRegimenDed.value);
    if (!regime) return;

    const regimeData = regime[0];

    const dataMapper: ITeachingDedicactionsRegimePost = {
      nLegRegCodigo     : id ?? undefined,
      cLegCatInstitucion: data.cLegGraInstitucion.value,
      cLegRegPais       : data.vPais.value.toString(),
      // cLegRegOtraInst   : data.cLegGraOtraInst ?? "",
      cLegRegOtraInst   : data.cLegGraInstitucion.value === OTHER_INSTITUTION_VALUE ? data.cLegGraOtraInst : "",
      nLegRegDedicacion : regimeData.nConCodigo,
      nValorDedicacion  : regimeData.nConValor,
      dLegRegFechaInicio: formatDate(data.dateFecIni, "short", "-"),
      dLegRegFechaFin   : formatDate(data.dateFecFin, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegRegValida     : "false",
      cLegRegEstado     : "true"      
    }

    registerTeachingDedicationRegime(dataMapper);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleSubmit(onSubmit)();
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Régimen Dedicación Docente">
      {
        isErrorTeachingDedicationRegime ? (
          <AlertMessage variant="error" title="Error al cargar el régimen dedicación docente." />
        ) : (
          <>
            {
              isLoadingTeachingDedicationRegime ? (
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
                      label="Régimen Dedicación"
                      name="lRegimenDed"
                      control={control}
                      options={optionsDedicationRegime}
                      placeholder="Seleccione un régimen"
                      errorMessage={errors.lRegimenDed?.message}
                      isLoading={isLoadingDedicationRegime}
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
          </>
        )
      }
    </ModalContainer>
  );
};

export default ModalTeachingDedicationRegime;
