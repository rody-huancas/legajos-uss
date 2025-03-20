import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
/* Modules */
import ListSocialProjection from "@modules/admin/FormsGeneral/proyeccion-social/pages/ListSocialProjection";
import ModalSocialProjection from "@modules/admin/FormsGeneral/proyeccion-social/pages/ModalSocialProjection";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  nLegDatCodigo: number;
}

export const SectionSocialProjection = (props: Props) => {
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
        <ListSocialProjection nLegDatCodigo={nLegDatCodigo} />
      </div>

      {
        showModal && (
          <ModalSocialProjection showModal={showModal} onClose={() => setShowModal(false)} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </>
  );
};
