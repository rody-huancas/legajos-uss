/* Components */
import Button from "@shared/components/ui/Button/Button";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
import { useCountries } from "../hooks/useCountries";
/* Schemas */
import { legajoDataSchema, LegajoDataSchemaType } from "../schemas/general-information.validation";

const GeneralInformation = () => {
  const { nationalities, isLoading } = useCountries();
  const { register, control, handleSubmit, formState: { errors } } = useZodForm(legajoDataSchema)

  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data)
  }

  const nationalityOptions = nationalities.map((nat) => ({
    value: nat.nIntCodigo,
    label: nat.cIntDescripcion,
  }));

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} >
        <Accordion>
          <AccordionItem title="Datos Generales" index={0}>
            <div className="grid grid-cols-2 gap-5 py-2">
              {/* Left */}
              <div className="grid grid-cols-2 gap-5">
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

                {/* <InputField label="N° Documento de Identidad" register={register} name="dni" error={errors.dni} /> */}

              </div>


              {/* Right */}
              <div className="grid grid-cols-2 gap-5"></div>
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
