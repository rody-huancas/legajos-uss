import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Modules */
import ListTeachingCategory from "@modules/admin/FormsGeneral/categoria-docente/pages/ListTeachingCategory";
import ModalTeachingCategory from "@modules/admin/FormsGeneral/categoria-docente/pages/ModalTeachingCategory";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  nLegDatCodigo: number;
}

export const SectionTeachingCategory = (props: Props) => {
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
          <ListTeachingCategory nLegDatCodigo={nLegDatCodigo} />
        </div>
      </div>

      {
        showModal && <ModalTeachingCategory nLegDatCodigo={nLegDatCodigo} showModal={showModal} onClose={() => setShowModal(false)} />
      }
    </>
  );
};
