import { useState } from "react";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import ListComputerTools from "@modules/admin/FormsGeneral/dominio-herramientas/pages/ListComputerTools";
import ModalComputerTools from "@modules/admin/FormsGeneral/dominio-herramientas/pages/ModalComputerTools";
import ModalLanguageProficiency from "@modules/admin/FormsGeneral/dominio-idiomas/pages/ModalLanguageProficiency";
/* Modules */
import ListLanguageProficiency from "@modules/admin/FormsGeneral/dominio-idiomas/pages/ListLanguageProficiency";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";

interface Props {
  nLegDatCodigo: number;
}

export const SectionLanguageMasteryTools = (props: Props) => {
  const { nLegDatCodigo } = props;
  const [showModalTools, setShowModalTools]       = useState<boolean>(false)
  const [showModalLanguage, setShowModalLanguage] = useState<boolean>(false)
  
  return (
    <>
      <div className="space-y-5 mb-7 py-2">
        <div className="flex flex-col gap-5">
          <div className="space-y-3">
            <h2 className="font-bold text-xs uppercase text-secondary-800">
              Dominio de un idioma distinto al materno
            </h2>

            <div className="flex justify-end">
              <Button className="gap-2 px-7" onClick={() => setShowModalLanguage(true)}>
                <HiAcademicCap size={20} /> Agregar
              </Button>
            </div>

            {/* Tabla */}
            <ListLanguageProficiency nLegDatCodigo={nLegDatCodigo} />
          </div>

          <div className="space-y-3 mt-5">
            <h2 className="font-bold text-xs uppercase text-secondary-800">
              Dominio de herramientas de informática
            </h2>

            <div className="flex justify-end">
              <Button className="gap-2 px-7" onClick={() => setShowModalTools(true)}>
                <HiAcademicCap size={20} /> Agregar
              </Button>
            </div>

            {/* Tabla */}
            <ListComputerTools nLegDatCodigo={nLegDatCodigo} />
          </div>
        </div>
      </div>


      {/* Modal de dominio de idioma */}
      { showModalLanguage && <ModalLanguageProficiency showModal={showModalLanguage} onClose={() => setShowModalLanguage(false)} nLegDatCodigo={nLegDatCodigo} /> }

      {/* Modal de dominio de TIC's */}
      { showModalTools && <ModalComputerTools showModal={showModalTools} onClose={() => setShowModalTools(false)} nLegDatCodigo={nLegDatCodigo} /> }
    </>
  );
};
