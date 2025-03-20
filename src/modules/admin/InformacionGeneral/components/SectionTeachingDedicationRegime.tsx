import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Modules */
import ListTeachingDedicationRegime from "@modules/admin/FormsGeneral/regimen-dedicacion-docente/pages/ListTeachingDedicationRegime";
import ModalTeachingDedicationRegime from "@modules/admin/FormsGeneral/regimen-dedicacion-docente/pages/ModalTeachingDedicationRegime";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  nLegDatCodigo: number;
}

export const SectionTeachingDedicationRegime = (props: Props) => {
  const { nLegDatCodigo } = props;
  const [showModal, setShowModal] = useState<boolean>(false)
  
  return (
    <>
      <div className="space-y-5 mb-7 py-2">
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <Button className="gap-2 px-7" onClick={() => setShowModal(true)}>
              <HiAcademicCap size={20} /> Agregar
            </Button>
          </div>

          {/* Tabla */}
          <ListTeachingDedicationRegime nLegDatCodigo={nLegDatCodigo} />
        </div>
      </div>

      {
        showModal && <ModalTeachingDedicationRegime showModal={showModal} onClose={() => setShowModal(false)} nLegDatCodigo={nLegDatCodigo} />
      }
    </>
  );
};
