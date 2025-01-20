import { useEffect } from "react";
import Modal from "react-modal";
import { cva, type VariantProps } from "class-variance-authority";
/* Icons */
import { RiCloseLine } from "react-icons/ri";
/* Utils */
import { cn } from "@shared/utils/globals.util";
/* Css */
import "./modal.module.css";

const modalVariants = cva(
  "px-10 py-5 rounded-xl absolute bg-white shadow-xl outline-none border-none z-30",
  {
    variants: {
      size: {
        default: "w-[90%] md:w-[800px]",
        sm: "w-[90%] md:w-[400px]",
        md: "w-[90%] md:w-[600px]",
        lg: "w-[90%] md:w-[900px]",
        xl: "w-[90%] xl:w-[1100px]",
        full: "w-[95%] md:w-[95%]"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);

interface PropsModalContainer extends VariantProps<typeof modalVariants> {
  isOpen    : boolean;
  onClose   : () => void;
  children  : React.ReactNode;
  title    ?: string;
  subtitle ?: string;
  className?: string;
  showButtonClose?: boolean;
}

const customStyles = {
  content: {
    top      : "50%",
    left     : "50%",
    right    : "auto",
    bottom   : "auto",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ModalContainer: React.FC<PropsModalContainer> = (props) => {
  const { isOpen, onClose, children, title, subtitle, size, className, showButtonClose = true } = props;

  useEffect(() => {
    if (isOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");

    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      className={cn(modalVariants({ size }), className)}
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      { showButtonClose && (
        <div className="w-full flex justify-end py-2 md:py-0">
          <button
            onClick={onClose}
            className="text-lg bg-red-500 p-1 rounded text-white hover:bg-red-600 transition-colors"
          >
            <RiCloseLine />
          </button>
        </div>
      )}
      <div className="py-2 flex flex-col gap-5 h-full md:h-auto overflow-y-scroll md:overflow-visible pb-10 md:pb-0 text-secondary-800">
        {title && (
          <h2 className="text-xl font-extrabold uppercase flex items-center gap-2">
            {title}
            {subtitle && <span className="text-blue-600/80">{subtitle}</span>}
          </h2>
        )}
        {children}
      </div>
    </Modal>
  );
};

export default ModalContainer;