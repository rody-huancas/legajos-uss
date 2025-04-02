import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
/* Components */
import Tabs from "@shared/components/ui/Tabs/Tabs";
import Button from "@shared/components/ui/Button/Button";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import { Title } from "@shared/components/ui/Title/Title";
import { Accordion } from "@shared/components/ui/Accordion/Accordion";
import { AccordionItem } from "@shared/components/ui/Accordion/AccordionItem";
import { LazyLoadSection } from "@shared/components/common/LazyLoadSection/LazyLoadSection";
import { SectionGeneralData } from "../components/SectionGeneralData";
import { SectionDocumentsDJ } from "../components/SectionDocumentsDJ";
import { SectionDegreesTitles } from "../components/SectionDegreesTitles";
import { SectionAttachDocuments } from "../components/SectionAttachDocuments";
import { SectionSocialProjection } from "../components/SectionSocialProjection";
import { SectionTeachingCategory } from "../components/SectionTeachingCategory";
import { SectionLanguageMasteryTools } from "../components/SectionLanguageMasteryTools";
import { SectionExperienceUniversity } from "../components/SectionExperienceUniversity";
import { SectionTeachingDedicationRegime } from "../components/SectionTeachingDedicationRegime";
import { SectionRecognitionOtherInstitutions } from "../components/SectionRecognitionOtherInstitutions";
import { SectionUniversityAdministrativeBurden } from "../components/SectionUniversityAdministrativeBurden";
import { SectionNoTeachingProfessionalExperience } from "../components/SectionNoTeachingProfessionalExperience";
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
      if (!user?.cPerCodigo) return;
      return await informationGeneralService.getGeneralInformation(user.cPerCodigo);
    },
    enabled: !!user?.cPerCodigo,
  });

  useEffect(() => {
    console.log({
      user,
      dataGI
    })
  }, [user, dataGI])
  
  const onSubmit = async (data: LegajoDataSchemaType) => {
    console.log(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar la información." />;
  }

  if (dataGI === undefined) {
    return <AlertMessage variant="error" title="Ocurrió un error al cargar la información." />;
  }

  const tabs = [
    {
      label: "Curriculum Vitae",
      content: (
        <div className="space-y-5">
          <Title level={2} size="lg">Información General</Title>

          <Accordion>
            <AccordionItem title="Datos Generales" index={0}>
              <LazyLoadSection>
                <SectionGeneralData control={control} errors={errors} register={register} watch={watch} generalData={dataGI} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Adjuntar Documentos" index={1}>
              <LazyLoadSection>
                <SectionAttachDocuments setValue={setValue} errors={errors} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Grados y Títulos" index={2}>
              <LazyLoadSection>
                <SectionDegreesTitles setValue={setValue} errors={errors} nLegDatCodigo={dataGI.nLegDatCodigo} legGradoTitulo={dataGI?.legGradoTitulo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Experiencia en Docencia Universitaria" index={3}>
              <LazyLoadSection>
                <SectionExperienceUniversity nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Categoría Docente" index={4}>
              <LazyLoadSection>
                <SectionTeachingCategory nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Régimen Dedicación Docente" index={5}>
              <LazyLoadSection>
                <SectionTeachingDedicationRegime nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Experiencia Profesional no Docente" index={6}>
              <LazyLoadSection>
                <SectionNoTeachingProfessionalExperience nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Dominio de idiomas - Herramientas de Informática" index={7}>
              <LazyLoadSection>
                <SectionLanguageMasteryTools nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Carga administrativa universitaria" index={8}>
              <LazyLoadSection>
                <SectionUniversityAdministrativeBurden nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Reconocimiento de otras instituciones" index={9}>
              <LazyLoadSection>
                <SectionRecognitionOtherInstitutions nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
            <AccordionItem title="Proyección social" index={10}>
              <LazyLoadSection>
                <SectionSocialProjection nLegDatCodigo={dataGI.nLegDatCodigo} />
              </LazyLoadSection>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    },
    {
      label: "Documentos/DJ",
      content: (
        <Accordion>
          <AccordionItem title="Declaraciones Juradas" index={0}>
            <LazyLoadSection>
              <SectionDocumentsDJ />
            </LazyLoadSection>
          </AccordionItem>
        </Accordion>
      ),
    },
  ];

  return (
    <div className="w-full space-y-5">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        
        <Tabs tabs={tabs} />
        
        <Button type="submit">Guardar Datos</Button>
      </form>
    </div>
  );
};

export default GeneralInformation;