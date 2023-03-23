import { ReactNode } from 'react';
import {
  Wrapper,
  Overlay,
  ModalContent,
  ModalHeadLilne,
  XMarkIcon,
  XMarkIconWrapper,
} from './Modal.style';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps): JSX.Element => {
  return (
    <Wrapper>
      <Overlay onClick={onClose} />
      <ModalContent>
        <ModalHeadLilne>
          <XMarkIconWrapper onClick={onClose}>
            <XMarkIcon />
          </XMarkIconWrapper>
        </ModalHeadLilne>
        {children}
      </ModalContent>
    </Wrapper>
  );
};

export default Modal;
