import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import Loader from "@shared/components/ui/Loader/Loader";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
/* Utils */
import { formatDate } from "@shared/utils/globals.util";
import { showNotification } from "@shared/utils/notification.util";
/* Schemas */
import { languageProficiencySchema, LanguageProficiencyType } from "../schemas/language-proficiency.validation";
/* Models */
import { IGeneralProps } from "@shared/models/global.model";
import { ILanguageProficiencyPost } from "../models/language-proficiency.model";
/* Services */
import { languageProficiencyService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

const ModalLanguageProficiency = ({ showModal, onClose, nLegDatCodigo, id }: IGeneralProps) => {
  if (!nLegDatCodigo) return;

  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { control, handleSubmit, formState: { errors }, setValue } = useZodForm(languageProficiencySchema);

  // Obtener el dominio del idioma
  const { data: languagesProficiency, isLoading, isError } = useQuery({
    queryKey: ["languagesProficiency", nLegDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await languageProficiencyService.getLanguageProficiency(id);
        return response;
      }
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (id && languagesProficiency) {
      setValue("vIdioma", { value: languagesProficiency.vCodigoDesc.nConValor, label: languagesProficiency.vCodigoDesc.cConDescripcion });
      setValue("vNivel", { value: languagesProficiency.vNivel.nConCodigo, label: languagesProficiency.vNivel.cConDescripcion });
      setValue("dateFecCert", new Date(languagesProficiency.dLegIdOfFecha));
    }
  }, [languagesProficiency, setValue, id]);

  const { mutate: registerLanguageProficiency, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: ILanguageProficiencyPost) => {
      if (id) {
        await languageProficiencyService.updateLanguageProficiency(id, data);
      } else {
        await languageProficiencyService.registerLanguageProficiency(nLegDatCodigo, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["languagesProficiencies", nLegDatCodigo],
      });
      if (id) showNotification( "success", "El dominio de idioma se ha actualizado correctamente." );
      else showNotification( "success", "El dominio de idioma se ha registrado correctamente." );
      onClose();
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const onSubmit = async (data: LanguageProficiencyType) => {
    const languagesLevelOptions = options.raw?.languages?.filter(item => item.nConValor === data.vIdioma.value);
    const levelOptions          = options.raw.languageLevel?.filter(item => item.nConValor === data.vNivel.value);

    if (!languagesLevelOptions || !levelOptions) return;

    const dataLanguagesLevel = languagesLevelOptions[0];
    const dataLevel          = levelOptions[0];

    const dataMapper: ILanguageProficiencyPost = {
      nLegIdOfCodigo    : id ?? undefined,
      nLegIdOfCodigoDesc: dataLanguagesLevel.nConCodigo,
      nValorDesc        : dataLanguagesLevel.nConValor,
      nLegIdOfNivel     : dataLevel.nConCodigo,
      nValorNivel       : dataLevel.nConValor,
      cLegIdOfTipo      : "false",
      dLegIdOfFecha     : formatDate(data.dateFecCert),
      cFile             : data.cLegDocArchivo,
      cLegIdOfValida    : "false",
      cLegIdOfEstado    : "true"
    }

    registerLanguageProficiency(dataMapper)
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleSubmit(onSubmit)();
  };

  return (
    <ModalContainer
      isOpen={showModal}
      onClose={onClose}
      title="Agregar Dominio de Idioma"
    >
      {
        isError ? (
          <AlertMessage variant="error" title="Error al cargar el dominio de idioma." />
        ) : (
          <>
            {
              isLoading ? (
                <Loader />
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-7">
                  <div className="space-y-5">
                    <ReactSelect
                      label="Idioma"
                      name="vIdioma"
                      control={control}
                      options={options.languages}
                      placeholder="Seleccione un Idioma"
                      errorMessage={errors.vIdioma?.message}
                      isLoading={loadingStates.languages}
                    />

                    <ReactSelect
                      label="Nivel"
                      name="vNivel"
                      control={control}
                      options={options.languageLevel}
                      placeholder="Seleccione un nivel"
                      errorMessage={errors.vNivel?.message}
                      isLoading={loadingStates.languageLevel}
                    />

                    <InputDatePicker
                      control={control}
                      name="dateFecCert"
                      label="Fecha Certificación"
                      required
                      errorMessage={errors.dateFecCert?.message}
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

export default ModalLanguageProficiency;
