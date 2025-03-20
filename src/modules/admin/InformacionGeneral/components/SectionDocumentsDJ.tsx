import FileUploader from "@shared/components/ui/FileUploader/FileUploader";

export const SectionDocumentsDJ = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-1 2lx:grid-cols-3 gap-5 lg:gap-10 mt-5">
      <FileUploader
        name="cLegDatBuenaSalud"
        title="ANEXO 2 (Formato PDF)"
        acceptedFileTypes="application/pdf"
        // setValue={setValue}
        // error={errors.cLegDatBuenaSalud?.message}
      />

      <FileUploader
        name="cLegDatPolicial"
        title="ANEXO 6 (Formato PDF)"
        acceptedFileTypes="application/pdf"
        // setValue={setValue}
        // error={errors.cLegDatPolicial?.message}
      />

      <FileUploader
        name="cLegDatJudicial"
        title="ANEXO 7 (Formato PDF)"
        acceptedFileTypes="application/pdf"
        // setValue={setValue}
        // error={errors.cLegDatJudicial?.message}
      />
    </div>
  );
};
