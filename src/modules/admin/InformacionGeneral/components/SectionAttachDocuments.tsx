import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { LegajoDataSchemaType } from "../schemas/general-information.validation";

interface Props {
  errors  : FieldErrors<LegajoDataSchemaType>;
  setValue: UseFormSetValue<LegajoDataSchemaType>;
}
export const SectionAttachDocuments = ({ setValue, errors }: Props) => {
  return (
    <div className="space-y-5 mb-7">
      <FileUploader
        name="cLegDatBuenaSalud"
        title="Certificado Médico de gozar buena salud física y mental (PDF)"
        acceptedFileTypes="application/pdf"
        setValue={setValue}
        error={errors.cLegDatBuenaSalud?.message}
      />

      <FileUploader
        name="cLegDatPolicial"
        title="Antecedentes Policiales (PDF)"
        acceptedFileTypes="application/pdf"
        setValue={setValue}
        error={errors.cLegDatPolicial?.message}
      />

      <FileUploader
        name="cLegDatJudicial"
        title="Antecedentes Judiciales (PDF)"
        acceptedFileTypes="application/pdf"
        setValue={setValue}
        error={errors.cLegDatJudicial?.message}
      />
    </div>
  );
};
