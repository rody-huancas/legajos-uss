import { useEffect, useState } from "react";
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
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
import { showNotification } from "@shared/utils/notification.util";
/* Schemas */
import { computerToolsSchema, ComputerToolsType } from "../schemas/computer-tools.validation";
/* Models */
import { IConstante } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { IComputerToolsPost } from "../models/computer-tools.model";
/* Services */
import { computerToolsService } from "../services";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  id            ?: number | null;
  legGradoTitulo?: ILegGradoTitulo[];
}

const ModalComputerTools = ({ showModal, onClose, legGradoTitulo, id }: Props) => {
  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;

  const dataFilter       = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { watch, control, handleSubmit, formState: { errors }, setValue } = useZodForm(computerToolsSchema);

  const [habilitiesData, setHabilitiesData] = useState<IConstante[] | undefined>([])

  // Obtener el dominio de TICs
  const { data: computerTool, isLoading, isError } = useQuery({
    queryKey: ["computerTool", nLegGraDatCodigo, id],
    queryFn: async () => {
      if (id) {
        const response = await computerToolsService.getComputerTool(id);
        return response;
      }
    },
    enabled: !!id,
  });

  // Cargar opciones de idiomas
  useEffect(() => {
    if (id && computerTool) {
      const optionInformatic = options.raw?.informatic?.find(item => item?.nConValor.toString() === computerTool.nValorDesc.toString().substring(0, 4));

      setValue("vIdioma", { value: optionInformatic?.nConValor!, label: optionInformatic?.cConDescripcion! });
      if (computerTool.nValorDesc.toString().length > 4) {
        setValue("vHabilidad", { value: computerTool.vCodigoDesc.nConValor, label: computerTool.vCodigoDesc.cConDescripcion });
      }
      setValue("vNivel", { value: computerTool.vNivel.nConValor, label: computerTool.vNivel.cConDescripcion });
      setValue("dateFecCert", new Date(computerTool.dLegIdOfFecha));
    }
  }, [computerTool, setValue, id]);

  // Cambiar opciones de habilidades
  useEffect(() => {
    if (watch("vIdioma")) {
      const { value } = watch("vIdioma");
      const data = options.raw.officeSkills?.filter(item => item.nConValor.toString().substring(0, 4) === value.toString());
      
      setHabilitiesData(data);
    }
  }, [watch("vIdioma")]);

  const optionsHabilities = formatToOptions(habilitiesData);
  
  // Registrar/Editar
  const { mutate: registerComputerTools, isPending: isSubmitting } = useMutation({
    mutationFn: async (data: IComputerToolsPost) => {
      if (id) await computerToolsService.updateComputerTools(id, data);
      else await computerToolsService.registerComputerTools(nLegGraDatCodigo, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computerTools", nLegGraDatCodigo] });
      if (id) showNotification( "success", "El dominio de TICs se ha actualizado correctamente." );
      else showNotification( "success", "El dominio de TICs se ha registrado correctamente." );
      onClose();
    },
    onError: (error) => showNotification("error", error.message)
  });

  const onSubmit = async (data: ComputerToolsType) => {
    const habilitiesOptions = options.raw.officeSkills?.filter(item => item.nConValor === data?.vHabilidad?.value);
    const informaticOptions = options.raw.informatic?.filter(item => item.nConValor === data?.vIdioma?.value);
    const levelOptions      = options.raw.languageLevel?.filter(item => item.nConValor === data.vNivel.value);

    if (!habilitiesOptions || !levelOptions || !informaticOptions) return;

    const dataLevel      = levelOptions[0];
    const dataHabilities = habilitiesOptions[0];
    const datainformatic = informaticOptions[0];

    const dataMapper: IComputerToolsPost = {
      nLegIdOfCodigo    : id ?? undefined,
      nLegIdOfCodigoDesc: dataHabilities ? dataHabilities.nConCodigo : datainformatic.nConCodigo,
      nValorDesc        : dataHabilities ? dataHabilities.nConValor : datainformatic.nConValor,
      nLegIdOfNivel     : dataLevel.nConCodigo,
      nValorNivel       : dataLevel.nConValor,
      cLegIdOfTipo      : "true",
      dLegIdOfFecha     : formatDate(data.dateFecCert),
      cFile             : data.cLegDocArchivo,
      cLegIdOfValida    : "false",
      cLegIdOfEstado    : "true"
    }

    registerComputerTools(dataMapper)
  };

  return (
    <ModalContainer
      isOpen={showModal}
      onClose={onClose}
      title="Agregar Dominio de TIC's"
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                  <div className="space-y-5">
                    <ReactSelect
                      label="Informática"
                      name="vIdioma"
                      control={control}
                      options={options.informatic}
                      placeholder="Seleccione una opción"
                      errorMessage={errors.vIdioma?.message}
                      isLoading={loadingStates.informatic}
                    />

                    <ReactSelect
                      label="Habilidad"
                      name="vHabilidad"
                      control={control}
                      options={optionsHabilities}
                      placeholder="Seleccione una Habilidad"
                      errorMessage={errors.vHabilidad?.message}
                      isLoading={loadingStates.officeSkills}
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

export default ModalComputerTools;
