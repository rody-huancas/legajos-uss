import ModalContainer from "@shared/components/ui/Modal/Modal";

interface Props {
  showModal: boolean;
  onClose  : () => void;
}

export const ModalDegreesTitle = (props: Props) => {
  const { showModal, onClose } = props;
  
  return (
    <ModalContainer isOpen={showModal} onClose={onClose}>
      ModalDegreesTitle
    </ModalContainer>
  );
};
