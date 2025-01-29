import { useState } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
import ListDegreesTitle from "@modules/admin/FormsGeneral/grados-titulos/pages/ListDegreesTitle";
import ModalDegreesTitle from "@modules/admin/FormsGeneral/grados-titulos/pages/ModalDegreesTitle";
/* Data */
/* Schemas */
import { LegajoDataSchemaType } from "../schemas/general-information.validation";
/* Models */
import { ILegGradoTitulo } from '../models/general-information.model';
/* Services */
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  setValue       : UseFormSetValue<LegajoDataSchemaType>;
  errors         : FieldErrors<LegajoDataSchemaType>;
  legGradoTitulo?: ILegGradoTitulo[];
}

export const SectionDegreesTitles = (props: Props) => {
  const { setValue, errors, legGradoTitulo = [] } = props;
  const [addRegister, setAddRegister] = useState<boolean>(false);

  const nLegGraDatCodigo = legGradoTitulo[0]?.nLegGraDatCodigo;

  return (
    <>
      <div className="space-y-5 mb-7">
        <FileUploader
          name="cLegDatSunedu" title="Registro Sunedu (PDF)" acceptedFileTypes="application/pdf" setValue={setValue} error={errors.cLegDatSunedu?.message}
        />

        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <Button className="gap-2 px-7" onClick={() => setAddRegister(true)}>
              <HiAcademicCap size={20} /> Agregar
            </Button>
          </div>

          <ListDegreesTitle nLegGraDatCodigo={nLegGraDatCodigo} />
        </div>
      </div>

      {/* Modals */}
      {addRegister && (
        <ModalDegreesTitle showModal={addRegister} onClose={() => setAddRegister(false)} legGradoTitulo={legGradoTitulo} />
      )}
    </>
  );
};