import Button from "@shared/components/ui/Button/Button";
import Loader from "@shared/components/ui/Loader/Loader";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
import { IGeneralProps } from "@shared/models/global.model";
import { formatToOptions } from "@modules/admin/InformacionGeneral/utils";
import { useDegreesTitleForm } from "../hooks/useDegreesTitleForm";
/* Icons */
import { LuSaveAll } from 'react-icons/lu';

const ModalDegreesTitle = ({ showModal, onClose, legGradoTitulo, id }: IGeneralProps) => {
  const {
    register,
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    institutions,
    loadInstitutions,
    isLoading,
    isError,
    isSubmitting,
    onSubmit,
    loadMoreInstitutions,
    handleSearch,
    academicDegreeOptions,
    options,
    loadingStates,
  } = useDegreesTitleForm({ legGradoTitulo, id, onClose });

  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    handleSubmit(onSubmit)();
  };

  return (
    <ModalContainer isOpen={showModal} onClose={onClose} title="Agregar Grado y Título">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <AlertMessage variant="error" title="No se pudo cargar los datos." />
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
                  label="Grado Académico"
                  name="vGradoAcad"
                  control={control}
                  options={academicDegreeOptions}
                  placeholder="Seleccione un grado académico"
                  errorMessage={errors.vGradoAcad?.message}
                />

                <InputField
                  label="Mención en"
                  register={register}
                  name="cLegGraCarreraProf"
                  error={errors.cLegGraCarreraProf}
                  placeholder="Ingrese la mención en..."
                />

                <InputDatePicker
                  control={control}
                  name="dLegGraFecha"
                  label="Fecha de obtención"
                  required
                  errorMessage={errors.dLegGraFecha?.message}
                />

                <FileUploader
                  name="cLegGraArchivo"
                  title="Adjuntar archivo (PNG, JPG, JPEG, PDF)"
                  acceptedFileTypes="image/*, application/pdf"
                  setValue={setValue}
                  error={errors.cLegGraArchivo?.message}
                />
              </div>

              <Button type="submit" className="gap-2" disabled={isSubmitting}>
                <LuSaveAll size={16} /> {isSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </form>
          )}
        </>
      )}
    </ModalContainer>
  );
};

export default ModalDegreesTitle;