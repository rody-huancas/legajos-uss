import Button from "@shared/components/ui/Button/Button";
import InputEmpty from "@shared/components/ui/InputField/InputEmpty";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useCountries } from "../hooks/useCountries";
import { useAcademicDegree, useDocumentIdentity, useLanguage, useMaritalStatus, useSexo } from "../hooks/useInformationGeneral";
/* Schemas */
import { legajoDataSchema, LegajoDataSchemaType } from "../schemas/general-information.validation";
import { calculateAge } from "@shared/utils/globals.util";
import { useEffect, useState } from "react";

const GeneralInformation = () => {
  const { nationalities, isLoading } = useCountries();
  const { data: academicDegree, isLoading: isLoadingAcademicDegree } = useAcademicDegree();
  const { data: maritalStatus, isLoading: isLoadingMarital } = useMaritalStatus();
  const { data: documentIdentity, isLoading: isLoadingDocuments } = useDocumentIdentity();
  const { data: sexo, isLoading: isLoadingSexo } = useSexo();
  const { data: languages, isLoading: isLoadingLanguage } = useLanguage();

  // RHF
  const { register, control, handleSubmit, formState: { errors }, watch } = useZodForm(legajoDataSchema)

  // States
  const [age, setAge] = useState<number>()

  // Grados Académicos
  const academicDegreeOptions = academicDegree?.map((opt) => ({
    value: opt.nIntCodigo,
    label: opt.cIntDescripcion,
  }));

  // Nacionalidades
  const nationalityOptions = nationalities.map((opt) => ({
    value: opt.nIntCodigo,
    label: opt.cIntDescripcion,
  }));

  // Documentos de identidad
  const documentIdentityOptions = documentIdentity?.map((opt) => ({
    value: opt.nIntCodigo,
    label: opt.cIntDescripcion,
  }));

  // Estado Civil
  const maritalStatusOptions = maritalStatus?.map((opt) => ({
    value: opt.nConValor,
    label: opt.cConDescripcion,
  }));

  // Estado Civil
  const sexoOptions = sexo?.map((opt) => ({
    value: opt.nConValor,
    label: opt.cConDescripcion,
  }));

  // Estado Civil
  const languageOptions = languages?.map((opt) => ({
    value: opt.nConValor,
    label: opt.cConDescripcion,
  }));

  useEffect(() => {
    const fechaNacimiento = watch("dLegDatFechaNacimiento");
    if (fechaNacimiento) {
      const ageUser = calculateAge(new Date(fechaNacimiento));
      setAge(ageUser);
    } else {
      setAge(undefined);
    }
  }, [watch("dLegDatFechaNacimiento")]);

  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} >
        <Accordion>
          <AccordionItem title="Datos Generales" index={0}>
            <div className="grid grid-cols-2 gap-5 py-2">
              {/* Left */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                <div className="col-span-2">
                  <ReactSelect
                    label="Nacionalidad"
                    name="nLegDatPais"
                    control={control}
                    options={nationalityOptions}
                    placeholder="Seleccione una nacionalidad"
                    errorMessage={errors.nLegDatPais?.message}
                    isLoading={isLoading}
                  />
                </div>

                <ReactSelect
                  label="Tipo de Documento"
                  name="vTipoDoc"
                  control={control}
                  options={documentIdentityOptions}
                  placeholder="Seleccione un tipo de documento"
                  errorMessage={errors.vTipoDoc?.message}
                  isLoading={isLoadingDocuments}
                />
                <InputField 
                  label="N° Documento de Identidad" register={register} name="cLegDatNroDoc" error={errors.cLegDatNroDoc} placeholder="N° Documento de Identidad"
                />
                <InputField 
                  label="Apellido Paterno" register={register} name="cLegDatApellidoPaterno" error={errors.cLegDatApellidoPaterno} placeholder="Apellido Paterno" classContainer="col-span-2"
                />
                <InputField 
                  label="Apellido Materno" register={register} name="cLegDatApellidoMaterno" error={errors.cLegDatApellidoMaterno} placeholder="Apellido Materno" classContainer="col-span-2"
                />
                <InputField 
                  label="Nombres" register={register} name="cLegDatNombres" error={errors.cLegDatNombres} placeholder="Nombres" classContainer="col-span-2"
                />
              </div>

              {/* Right */}
              <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                <InputDatePicker
                  control={control}
                  name="dLegDatFechaNacimiento"
                  label="Fecha de nacimiento"
                  required
                  placeholder="Selecciona una fecha"
                  errorMessage={errors.dLegDatFechaNacimiento?.message}
                />
                
                <InputEmpty label="Edad" disabled value={age !== undefined && age !== null ? `${age} Años` : "Edad"}/>
                
                <ReactSelect
                  label="Estado Civil"
                  name="vEstadoCivil"
                  control={control}
                  options={maritalStatusOptions}
                  placeholder="Seleccione una estado civil"
                  errorMessage={errors.vEstadoCivil?.message}
                  isLoading={isLoadingMarital}
                />

                <ReactSelect
                  label="Sexo"
                  name="vSexo"
                  control={control}
                  options={sexoOptions}
                  placeholder="Seleccione una estado civil"
                  errorMessage={errors.vSexo?.message}
                  isLoading={isLoadingSexo}
                />
                
                <InputField 
                  label="E-mail" register={register} name="cLegDatEmail" error={errors.cLegDatEmail} placeholder="E-mail" classContainer="col-span-2"
                />
                <InputField label="Móvil" register={register} name="cLegDatMovil" error={errors.cLegDatMovil} placeholder="Móvil" />
                <InputField label="Teléfono" register={register} name="cLegDatTelefono" error={errors.cLegDatTelefono} placeholder="Teléfono" />
                
                <ReactSelect
                  label="Mayor Grado Académico"
                  name="vGradoAcad"
                  control={control}
                  options={academicDegreeOptions}
                  placeholder="Seleccione una grado académico"
                  errorMessage={errors.vGradoAcad?.message}
                  isLoading={isLoadingAcademicDegree}
                />
                
                <ReactSelect
                  label="Idioma Nativo"
                  name="vIdiomaNativo"
                  control={control}
                  options={languageOptions}
                  placeholder="Seleccione un idioma"
                  errorMessage={errors.vIdiomaNativo?.message}
                  isLoading={isLoadingLanguage}
                />
                
              </div>
            </div>
          </AccordionItem>
          <AccordionItem title="Sección 2" index={1}>
            <p>Contenido de la segunda sección</p>
          </AccordionItem>
          <AccordionItem title="Sección 3" index={2}>
            <p>Contenido de la tercera sección</p>
          </AccordionItem>
        </Accordion>

        <Button type="submit">Guardar Datos</Button>
      </form>
    </div>
  );
};

export default GeneralInformation;
