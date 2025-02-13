import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Models */
import { ILegGradoTitulo } from "../models/general-information.model";
/* Modules */
import ListTeachingDedicationRegime from "@modules/admin/FormsGeneral/regimen-dedicacion-docente/pages/ListTeachingDedicationRegime";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";
import ModalTeachingDedicationRegime from "@modules/admin/FormsGeneral/regimen-dedicacion-docente/pages/ModalTeachingDedicationRegime";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

export const SectionTeachingDedicationRegime = (props: Props) => {
  const { legGradoTitulo = [] } = props;
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
          <ListTeachingDedicationRegime legGradoTitulo={legGradoTitulo} />
        </div>
      </div>

      {
        showModal && <ModalTeachingDedicationRegime showModal={showModal} onClose={() => setShowModal(false)} legGradoTitulo={legGradoTitulo} />
      }
    </>
  );
};
