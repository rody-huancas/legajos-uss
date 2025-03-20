import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Modules */
import ListRecognitionOtherInstitutions from "@modules/admin/FormsGeneral/reconocimiento-otras-instituciones/pages/ListRecognitionOtherInstitutions";
import ModalRecognitionOtherInstitutions from "@modules/admin/FormsGeneral/reconocimiento-otras-instituciones/pages/ModalRecognitionOtherInstitutions";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  nLegDatCodigo: number;
}

export const SectionRecognitionOtherInstitutions = (props: Props) => {
  const { nLegDatCodigo } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="space-y-5 mb-7 py-2">
        <div className="flex justify-end">
          <Button
            className="gap-2 px-7"
            onClick={() => setShowModal(true)}
          >
            <HiAcademicCap size={20} /> Agregar
          </Button>
        </div>

        {/* Tabla */}
        <ListRecognitionOtherInstitutions nLegDatCodigo={nLegDatCodigo} />
      </div>

      {
        showModal && (
          <ModalRecognitionOtherInstitutions showModal={showModal} onClose={() => setShowModal(false)} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </>
  );
};
