import { useEffect, useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import { Title } from "@shared/components/ui/Title/Title";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
/* Schemas */
import { legajoDataSchema, LegajoDataSchemaType } from "../schemas/general-information.validation";
/* Models */
import { ILegDatosGenerales } from "../models/general-information.model";
/* Utils */
/* Services */
import { informationGeneralService } from "../services";
/* Store */
import { useAuthStore } from "@store/auth/auth.store";
import { SectionGeneralData } from "../components/SectionGeneralData";

const GeneralInformation = () => {
  const user = useAuthStore(state => state.user);
  const { register, control, handleSubmit, formState: { errors }, watch } = useZodForm(legajoDataSchema);

  // States
  const [dataGI, setDataGI] = useState<ILegDatosGenerales>();

  // Data de información general
  useEffect(() => {
    const fetchGI = async () => {
      if (!user) return;
      const response = await informationGeneralService.getGeneralInformation(user?.cPerCodigo);
      setDataGI(response);
    }
    fetchGI();
  }, [])
  

  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data)
  }

  return (
    <div className="w-full space-y-5">
      <Title level={2} size="lg">Información General</Title>

      <form onSubmit={handleSubmit(onSubmit)} >
        <Accordion>
          <AccordionItem title="Datos Generales" index={0}>
            <SectionGeneralData control={control} errors={errors} register={register} watch={watch} />
          </AccordionItem>
          <AccordionItem title="Adjuntar Documentos" index={1}>
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
