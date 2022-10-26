import { ReactNode } from 'react';
import { Wrapper, Overlay, ModalContent } from './Modal.style';

interface ModalProps {
  children: ReactNode;
  handleModal: () => void;
}

const Modal = ({ children, handleModal }: ModalProps): JSX.Element => {
  return (
    <Wrapper>
      <Overlay onClick={handleModal} />
      <ModalContent>{children}</ModalContent>
    </Wrapper>
  );
};

export default Modal;
