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
import { IBaseOptionGI } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { IRecognitionOtherInstitutionPost } from "../models/recognition-other-institution.model";
/* Schemas */
import { recognitionOtherInstitutionsSchema, RecognitionOtherInstitutionsType } from "../schemas/recognition-other-institution.validation";
/* Services */
import { recognitionOtherInstitutionsService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  id            ?: number | null;
  legGradoTitulo?: ILegGradoTitulo[];
}

const ModalRecognitionOtherInstitutions = ({ showModal, onClose, legGradoTitulo, id }: Props) => {
  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;

  const dataFilter       = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;
  
  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(recognitionOtherInstitutionsSchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Obtener la carga administrativa universitaria
  const { data: recognitionOtherInstitution, isLoading: isLoadingRecognitionOtherInstitution, isError: isErrorRecognitionOtherInstitution } = useQuery({
    queryKey: ["recognitionOtherInstitution", nLegGraDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await recognitionOtherInstitutionsService.getRecognitionOtherInstitution(id);
        return response;
      }
    },
    enabled: !!id,
  });

  // Cargar la data para editar
  useEffect(() => {
    if (id) {
      if (recognitionOtherInstitution || recognitionOtherInstitution !== undefined) {
        const country = options.nationality.filter(item => item.value === Number(recognitionOtherInstitution.cLegRecPais));
        const countryData: IBaseOptionGI = country[0];
        
        if (countryData !== undefined) {
          setValue("vPais", { value: +countryData.value, label: countryData.label });
        }

        if (recognitionOtherInstitution.cLegRecInstitucion.trim() === OTHER_INSTITUTION_VALUE) {
          setValue("cLegGraInstitucion", { value: recognitionOtherInstitution.cLegRecInstitucion.toString().trim(), label: OTHER_INSTITUTION_LABEL });
        } else {
          if (recognitionOtherInstitution.cLegRecInstitucionNavigation) {
            setValue("cLegGraInstitucion", { value: recognitionOtherInstitution.cLegRecInstitucionNavigation.cPerApellido, label: recognitionOtherInstitution.cLegRecInstitucionNavigation.cPerNombre });
          }
        }
        
        setValue("cLegGraOtraInst", recognitionOtherInstitution.cLegRecOtraInst);
        if (recognitionOtherInstitution.vDocumento) {
          setValue("vDocumento", { value: recognitionOtherInstitution.vDocumento.nConValor, label: recognitionOtherInstitution.vDocumento.cConDescripcion });
        }
        if (recognitionOtherInstitution.vTipo) {
          setValue("vTipo", { value: recognitionOtherInstitution.vTipo.nConValor, label: recognitionOtherInstitution.vTipo.cConDescripcion });
        }
        setValue("dateFecha", new Date(recognitionOtherInstitution.dLegRecFecha));
      }
    }
  }, [recognitionOtherInstitution, setValue, options.nationality]);
  
  const { mutate: registerRecognitionOtherInstitution, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: IRecognitionOtherInstitutionPost) => {
      if (id) await recognitionOtherInstitutionsService.updateRecognitionOtherInstitutions(id, data)
      else await recognitionOtherInstitutionsService.registerRecognitionOtherInstitutions(nLegGraDatCodigo, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitionOtherInstitutions", nLegGraDatCodigo] });
  
      if (id) showNotification("success", "Régimen Dedicación Docente actualizado correctamente.");
      else showNotification("success", "Régimen Dedicación Docente registrado correctamente.");

      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: RecognitionOtherInstitutionsType) => {
    const recognition = options.raw.recognitions?.filter(item => item.nConValor === data.vDocumento.value);
    const recognitionDocument = options.raw.recognitionDocuments?.filter(item => item.nConValor === data.vTipo.value);
    
    if (!recognitionDocument || !recognition) return;

    const recognitionData         = recognition[0];
    const recognitionDocumentData = recognitionDocument[0];

    const dataMapper: IRecognitionOtherInstitutionPost = {
      nLegRecCodigo     : id ?? undefined,
      cLegRecInstitucion: data.cLegGraInstitucion.value,
      cLegRecPais       : data.vPais.value.toString(),
      cLegRecOtraInst   : data.cLegGraInstitucion.value === OTHER_INSTITUTION_VALUE ? data.cLegGraOtraInst : "",
      nLegRecDocumento  : recognitionData.nConCodigo,
      nValorDocumento   : recognitionData.nConValor,
      nLegRecTipo       : recognitionDocumentData.nConCodigo,
      nValorTipo        : recognitionDocumentData.nConValor,
      dLegRecFecha      : formatDate(data.dateFecha, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegRecValida     : "false",
      cLegRecEstado     : "true",
    };
  
    registerRecognitionOtherInstitution(dataMapper);
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Reconocimiento de Otras Instituciones">
      {
        isErrorRecognitionOtherInstitution ? (
          <AlertMessage variant="error" title="Error al cargar la reconocimiento de otras instituciones" />
        ) : isLoadingRecognitionOtherInstitution ? (
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
                label="Documento"
                name="vDocumento"
                control={control}
                options={options.recognitions}
                placeholder="Seleccione un Documento"
                errorMessage={errors.vDocumento?.message}
                isLoading={loadingStates.recognitions}
              />

              <ReactSelect
                label="Tipo"
                name="vTipo"
                control={control}
                options={options.recognitionDocuments}
                placeholder="Seleccione un Tipo"
                errorMessage={errors.vTipo?.message}
                isLoading={loadingStates.recognitionDocuments}
              />

              <InputDatePicker
                control={control}
                name="dateFecha"
                label="Fecha Inicio"
                required
                errorMessage={errors.dateFecha?.message}
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

export default ModalRecognitionOtherInstitutions;
