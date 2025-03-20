import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Modules */
import ListNoTeachingProfessionalExperience from "@modules/admin/FormsGeneral/experiencia-profesional-no-docente/pages/ListNoTeachingProfessionalExperience";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";
import ModalNoTeachingProfessionalExperience from "@modules/admin/FormsGeneral/experiencia-profesional-no-docente/pages/ModalNoTeachingProfessionalExperience";

interface Props {
  nLegDatCodigo: number;
}

export const SectionNoTeachingProfessionalExperience = (props: Props) => {
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
          <ListNoTeachingProfessionalExperience nLegDatCodigo={nLegDatCodigo} />
        </div>
      </div>

      {
        showModal && <ModalNoTeachingProfessionalExperience showModal={showModal} onClose={() => setShowModal(false)} nLegDatCodigo={nLegDatCodigo} />
      }
    </>
  );
};
