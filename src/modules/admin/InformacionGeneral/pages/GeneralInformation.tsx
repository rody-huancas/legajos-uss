import { useEffect, useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import { Title } from "@shared/components/ui/Title/Title";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
import { SectionGeneralData } from "../components/SectionGeneralData";
import { SectionAttachDocuments } from "../components/SectionAttachDocuments";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
/* Schemas */
import { legajoDataSchema, LegajoDataSchemaType } from "../schemas/general-information.validation";
/* Models */
import { ILegDatosGenerales } from "../models/general-information.model";
/* Services */
import { informationGeneralService } from "../services";
/* Store */
import { useAuthStore } from "@store/auth/auth.store";
import { SectionDegreesTitles } from "../components/SectionDegreesTitles";

const GeneralInformation = () => {
  const user = useAuthStore((state) => state.user);
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(legajoDataSchema);

  // States
  const [dataGI, setDataGI] = useState<ILegDatosGenerales>();

  // Data de información general
  useEffect(() => {
    const fetchGI = async () => {
      if (!user) return;
      const response = await informationGeneralService.getGeneralInformation(user?.cPerCodigo);
      setDataGI(response);
    };
    fetchGI();
  }, []);

  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data);
  };

  return (
    <div className="w-full space-y-5">
      <Title level={2} size="lg">
        Información General
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion>
          <AccordionItem title="Datos Generales" index={0}>
            <SectionGeneralData control={control} errors={errors} register={register} watch={watch} />
          </AccordionItem>
          <AccordionItem title="Adjuntar Documentos" index={1}>
            <SectionAttachDocuments setValue={setValue} errors={errors} />
          </AccordionItem>
          <AccordionItem title="Grados y Títulos" index={2}>
            <SectionDegreesTitles setValue={setValue} errors={errors} />
          </AccordionItem>
        </Accordion>

        <Button type="submit">Guardar Datos</Button>
      </form>
    </div>
  );
};

export default GeneralInformation;
