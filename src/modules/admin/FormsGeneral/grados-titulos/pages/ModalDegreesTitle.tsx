import { useEffect, useState } from "react";
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
import { degreesTitleSchema, DegreesTitleSchemaType } from "../schemas/degrees-titles.validation";
/* Utils */
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
/* Services */
import { degreesTitleService } from "../services";
import { informationGeneralService } from "@modules/admin/InformacionGeneral/services";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
/* Icons */
import { LuSaveAll } from "react-icons/lu";

interface Props {
  showModal: boolean;
  onClose: () => void;
  legGradoTitulo?: ILegGradoTitulo[];
}

const ModalDegreesTitle = (props: Props) => {
  const { showModal, onClose, legGradoTitulo } = props;

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(degreesTitleSchema);

 
  const [page, setPage] = useState(1);
  const [institutions, setInstitutions] = useState<IPersona[] | undefined>([]);
  const [allInstitutions, setAllInstitutions] = useState<IPersona[]>([]);
  const [loadInstitutions, setLoadInstitutions] = useState<boolean>(false);
  const [academics, setAcademics] = useState<IInterface[] | undefined>([])

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
  }, [watch("cLegGraInstitucion")])
  
  useEffect(() => {
    const fetchAcademics = async () => {
      const response = await informationGeneralService.getAcademicDegree();
      setAcademics(response);
    };
    fetchAcademics()
  }, [])

  const academicDegreeOptions = formatToOptions(academics);

  const loadMoreInstitutions = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * 100;
    const endIndex = nextPage * 100;

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

  const onSubmit = async (data: DegreesTitleSchemaType) => {
    const nLegGraCodigo = legGradoTitulo?.[0]?.nLegGraDatCodigo;
    
    const dataMapped = {
      NLegGraGradoAcad  : legGradoTitulo?.[0]?.nLegGraGradoAcad ?? 0,
      NClaseGradoAcad   : legGradoTitulo?.[0]?.nClaseGradoAcad ?? 0,
      CLegGraCarreraProf: data.cLegGraCarreraProf ?? "",
      CLegGraInstitucion: data.cLegGraInstitucion?.value ?? '',
      CLegGraOtraInst   : data.cLegGraOtraInst,
      NLegGraPais       : data.vPais?.value ?? 0,
      NClasePais        : legGradoTitulo?.[0]?.nClasePais ?? 0,
      DLegGraFecha      : data.dLegGraFecha.toISOString().split('T')[0],
      cFile             : data.cLegGraArchivo ?? null,
      CLegGraValida     : false,
      CLegGraEstado     : true,
    };
   
    await degreesTitleService.registerDegreeTitle(nLegGraCodigo, dataMapped);
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Grado y Título" >
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

          {
            String(watch("cLegGraInstitucion.value")) === "PER100" && (
              <InputField
                label="Nombre de Institución" register={register} name="cLegGraOtraInst" error={errors.cLegGraOtraInst} placeholder="Ingrese el nombre de institución" 
              />
            )
          }

          <ReactSelect
            label="Grado Académico"
            name="vGradoAcad"
            control={control}
            options={academicDegreeOptions}
            placeholder="Seleccione un grado académico"
            errorMessage={errors.vGradoAcad?.message}
          />
          
          <InputField
            label="Mención en" register={register} name="cLegGraCarreraProf" error={errors.cLegGraCarreraProf} placeholder="Ingrese la mención en..." 
          />

          <InputDatePicker
            control={control} name="dLegGraFecha" label="Fecha de obtención" required errorMessage={errors.dLegGraFecha?.message} 
          />

          <FileUploader
            name="cLegGraArchivo"
            title="Adjuntar archivo (PNG, JPG, JPEG, PDF)"
            acceptedFileTypes="image/*, application/pdf"
            setValue={setValue}
            error={errors.cLegGraArchivo?.message}
          />
        </div>

        <Button type="submit" className="gap-2">
          <LuSaveAll size={16} /> Guardar
        </Button>
      </form>
    </ModalContainer>
  );
};

export default ModalDegreesTitle;