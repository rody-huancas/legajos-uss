import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Models */
import { ILegGradoTitulo } from "../models/general-information.model";
/* Modules */
import ListSocialProjection from "@modules/admin/FormsGeneral/reconocimiento-otras-instituciones copy/pages/ListSocialProjection";
import ModalSocialProjection from "@modules/admin/FormsGeneral/reconocimiento-otras-instituciones copy/pages/ModalSocialProjection";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

export const SectionSocialProjection = (props: Props) => {
  const { legGradoTitulo = [] } = props;
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
        <ListSocialProjection legGradoTitulo={legGradoTitulo} />
      </div>

      {
        showModal && (
          <ModalSocialProjection showModal={showModal} onClose={() => setShowModal(false)} legGradoTitulo={legGradoTitulo} />
        )
      }
    </>
  );
};
