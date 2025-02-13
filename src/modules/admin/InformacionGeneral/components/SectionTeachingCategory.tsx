import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Models */
import { ILegGradoTitulo } from "../models/general-information.model";
/* Modules */
import ListTeachingCategory from "@modules/admin/FormsGeneral/categoria-docente/pages/ListTeachingCategory";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";
import ModalTeachingCategory from "@modules/admin/FormsGeneral/categoria-docente/pages/ModalTeachingCategory";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

export const SectionTeachingCategory = (props: Props) => {
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
          <ListTeachingCategory legGradoTitulo={legGradoTitulo} />
        </div>
      </div>

      {
        showModal && <ModalTeachingCategory legGradoTitulo={legGradoTitulo} showModal={showModal} onClose={() => setShowModal(false)} />
      }
    </>
  );
};
