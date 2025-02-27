import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Models */
import { ILegGradoTitulo } from "../models/general-information.model";
/* Modules */
import ListUniversityAdministrativeBurden from "@modules/admin/FormsGeneral/carga-administrativa-universitaria/pages/ListUniversityAdministrativeBurden";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";
import ModalUniversityAdministrativeBurden from "@modules/admin/FormsGeneral/carga-administrativa-universitaria/pages/ModalUniversityAdministrativeBurden";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

export const SectionUniversityAdministrativeBurden = (props: Props) => {
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
        <ListUniversityAdministrativeBurden legGradoTitulo={legGradoTitulo} />
      </div>

      {
        showModal && (
          <ModalUniversityAdministrativeBurden showModal={showModal} onClose={() => setShowModal(false)} legGradoTitulo={legGradoTitulo} />
        )
      }
    </>
  );
};
