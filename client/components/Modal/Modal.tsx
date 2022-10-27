import { ReactNode } from 'react';
import { Wrapper, Overlay, ModalContent } from './Modal.style';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps): JSX.Element => {
  return (
    <Wrapper>
      <Overlay onClick={onClose} />
      <ModalContent>{children}</ModalContent>
    </Wrapper>
  );
};

export default Modal;
