import { useQuery } from "@tanstack/react-query";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import { Title } from "@shared/components/ui/Title/Title";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
import { SectionGeneralData } from "../components/SectionGeneralData";
import { SectionDegreesTitles } from "../components/SectionDegreesTitles";
import { SectionAttachDocuments } from "../components/SectionAttachDocuments";
import { SectionTeachingCategory } from "../components/SectionTeachingCategory";
import { SectionExperienceUniversity } from "../components/SectionExperienceUniversity";
/* Hooks */
import { useZodForm } from "@shared/hooks/useZodForm";
/* Schemas */
import { legajoDataSchema, LegajoDataSchemaType } from "../schemas/general-information.validation";
/* Services */
import { informationGeneralService } from "../services";
/* Store */
import { useAuthStore } from "@store/auth/auth.store";

const GeneralInformation = () => {
  const user = useAuthStore((state) => state.user);
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useZodForm(legajoDataSchema);

  const { data: dataGI, isLoading, isError } = useQuery({
    queryKey: ["generalInformation", user?.cPerCodigo],
    queryFn: async () => {
      if (!user?.cPerCodigo) throw new Error("User code is missing");
      return await informationGeneralService.getGeneralInformation(user.cPerCodigo);
    },
    enabled: !!user?.cPerCodigo,
  });

  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar la información." />
  }

  return (
    <div className="w-full space-y-5">
      <Title level={2} size="lg">
        Información General
      </Title>
      {
        isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <Accordion>
              <AccordionItem title="Datos Generales" index={0}>
                <SectionGeneralData control={control} errors={errors} register={register} watch={watch} />
              </AccordionItem>
              <AccordionItem title="Adjuntar Documentos" index={1}>
                <SectionAttachDocuments setValue={setValue} errors={errors} />
              </AccordionItem>
              <AccordionItem title="Grados y Títulos" index={2}>
                <SectionDegreesTitles setValue={setValue} errors={errors} legGradoTitulo={dataGI?.legGradoTitulo} />
              </AccordionItem>
              <AccordionItem title="Experiencia en Docencia Universitaria" index={3}>
                <SectionExperienceUniversity legGradoTitulo={dataGI?.legGradoTitulo} />
              </AccordionItem>
              <AccordionItem title="Categoría Docente" index={4}>
                <SectionTeachingCategory legGradoTitulo={dataGI?.legGradoTitulo} />
              </AccordionItem>
            </Accordion>

            <Button type="submit">Guardar Datos</Button>
          </form>
        )
      }
    </div>
  );
};

export default GeneralInformation;