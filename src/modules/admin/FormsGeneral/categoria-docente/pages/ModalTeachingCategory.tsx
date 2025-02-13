/* Components */
import Button from "@shared/components/ui/Button/Button";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useInstitutionForm } from "@shared/hooks/useInstitutionForm";
import { useFormOptions } from "@modules/admin/InformacionGeneral/hooks/useFormOptions";
/* Utils */
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
/* Schemas */
import { teachingCategorySchema, TeachingCategorySchemaType } from "../schemas/teaching-category.validation";
/* Icons */
import { LuSaveAll } from "react-icons/lu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { experienceUnivesityService } from "../../experiencia-docencia-universitaria/services";
import { OTHER_INSTITUTION_VALUE } from "@config/constants/variables";
import { ITeachingCategoryPost } from "../models/teaching-category.model";
import { teachingCategoryService } from "../services";
import { formatDate } from "@shared/utils/globals.util";

interface Props {
  showModal      : boolean;
  onClose        : () => void;
  id            ?: number | null;
  legGradoTitulo?: ILegGradoTitulo[];
}

const ModalTeachingCategory = ({ showModal, onClose, legGradoTitulo, id }: Props) => {
  if (!legGradoTitulo) return;
  const dataFilter = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

  const queryClient = useQueryClient();

  const { options, loadingStates } = useFormOptions();
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(teachingCategorySchema);
  const { institutions, loadInstitutions, loadMoreInstitutions, handleSearch } = useInstitutionForm({
    countryFieldName         : "vPais",
    institutionFieldName     : "cLegGraInstitucion",
    otherInstitutionFieldName: "cLegGraOtraInst",
    watch,
    setValue,
  });

  // Data Fetching
  const { data: teachingCategory, isLoading: isLoadingTeachingCategory } = useQuery({
    queryKey: ["teachingCategory"],
    queryFn: async () => {
      const response = await experienceUnivesityService.getTeachingCategory();
      return response;
    },
  });

  // Mutación para registrar/editar
  const { mutate: registerTeaching, isPending: isSubmitting } = useMutation({
    mutationFn: async (dataMapper: ITeachingCategoryPost) => {
      await teachingCategoryService.registerTeachingCategory(nLegGraDatCodigo, dataMapper);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachingCategories", nLegGraDatCodigo] });
      onClose();
    },
    onError: (error) => {
      console.error("Error al registrar la categoría docente:", error);
    },
  });


  const optionsTeachingCategory = formatToOptions(teachingCategory || []);
    
  const onSubmit = async (data: TeachingCategorySchemaType) => {
    if (!legGradoTitulo) return;

    const category = teachingCategory?.filter(item => item.nConValor === data.lCategoriaDoc.value);

    if (!category) return;

    const categoryData = category[0];

    const dataMapper: ITeachingCategoryPost = {
      cLegCatInstitucion: data.cLegGraInstitucion.value,
      cLegCatPais       : data.vPais.value.toString(),
      cLegCatOtraInst   : data.cLegGraOtraInst ?? "",
      nLegCatCategoria  : categoryData.nConCodigo,
      nValorCategoria   : categoryData.nConValor,
      dLegCatFechaInicio: formatDate(data.dateFecIni, "short", "-"),
      dLegCatFechaFin   : formatDate(data.dateFecFin, "short", "-"),
      cFile             : data.cLegDocArchivo,
      cLegCatValida     : false,
      cLegCatEstado     : true
    }

    registerTeaching(dataMapper);
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Categoría del Docente">
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
            label="Categoría Docente"
            name="lCategoriaDoc"
            control={control}
            options={optionsTeachingCategory}
            placeholder="Seleccione la Categoría Docente"
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
    </ModalContainer>
  );
};

export default ModalTeachingCategory;
