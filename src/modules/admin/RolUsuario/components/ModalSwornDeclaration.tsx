import { useState } from "react";
import Button from "@shared/components/ui/Button/Button";
import ModalContainer from "@shared/components/ui/Modal/Modal";
import { useAuthStore } from "@store/auth/auth.store";
import { rolUserService } from "../services";
import { showNotification } from "@shared/utils/notification.util";
import { DECLARATION_CONTENT } from "../constants/sworn-declaration.content";
/* Icons */
import { RiLoaderLine } from "react-icons/ri";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSwornDeclaration = ({ isOpen, onClose }: Props) => {
  const user = useAuthStore((state) => state.user);
  const [load, setLoad] = useState<boolean>(false);
  const { introduction, sections, power, sectionstwo, area } =
    DECLARATION_CONTENT;

  const handleSwornDeclaration = async () => {
    setLoad(true);
    const data = { cPerCodigo: user?.cPerCodigo! };
    const response = await rolUserService.swornDeclaration(data);
    showNotification("success", response?.cmessage!);
    onClose();
    setLoad(false);
  };

  return (
    <ModalContainer
      title="DECLARACIÓN JURADA"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="h-[600px] overflow-y-scroll scroll"
      showButtonClose={false}
    >
      <div className="space-y-5">
        <div className="text-sm text-justify">
          <p className="leading-7">
            Yo{" "}
            <b>
              {user?.cPerApellido}, {user?.cPerNombre}
            </b>{" "}
            como colaborador de la <b>{introduction.institution}</b>, ubicada en{" "}
            {introduction.location}; declaro tener en pleno conocimiento sobre
            la información conferida en el presente documento, donde valora a
            sus colaboradores y usuarios este sitio web (en adelante, los
            Usuarios y el Sitio Web, Sistema de Legajos respectivamente) y que
            esté comprometido con subir información y por la USS el establecer
            la protección de su privacidad.
          </p>
          <p className="leading-7">
            Como parte de dicho compromiso,hemos desarrollado la presente
            política de privacidad (en adelante, la{" "}
            <b>Política de Privacidad</b>) que describe la manera en la que USS,
            en el marco de la relación - vínculo laboral para el uso del Sitio
            Web el sistema de <b>Legajo</b>, tratará la información que
            califique como datos personales y profesionales de los Usuarios.
          </p>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <hr className="my-4" />
              <h3 className="font-bold">{section.title}</h3>
              <div className="pl-10 space-y-2">
                {section.points.map((point, pointIndex) => (
                  <p key={pointIndex}>
                    <span>{pointIndex + 1}. </span> {point}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <p className="italic text-base my-4">{power}</p>

          {sectionstwo.map((section, index) => (
            <div key={index} className="space-y-4">
              <hr className="my-4" />
              <h3 className="font-bold">{section.title}</h3>
              <div className="space-y-2">
                <span>{section.point}</span>
              </div>
            </div>
          ))}

          <h4 className="font-bold text-base my-4">{area}</h4>
        </div>

        <Button
          size="xl"
          className="bg-[#99BA49] hover:bg-[#8eb33a] float-end flex items-center gap-1"
          onClick={handleSwornDeclaration}
          disabled={load}
        >
          {load && <RiLoaderLine className="animate-spin" size={18} />}
          {load ? "Enviando Datos" : "Aceptar"}
        </Button>
      </div>
    </ModalContainer>
  );
};

export default ModalSwornDeclaration;
