import { ReactNode } from 'react';
import useBodyOverflow from '../../hooks/useBodyOverflow';
import {
  Wrapper,
  Overlay,
  ModalContent,
  XMarkIcon,
  XMarkIconWrapper,
} from './Modal.style';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps): JSX.Element => {
  useBodyOverflow();

  return (
    <Wrapper>
      <Overlay onClick={onClose} />
      <ModalContent>
        <XMarkIconWrapper onClick={onClose}>
          <XMarkIcon />
        </XMarkIconWrapper>
        {children}
      </ModalContent>
    </Wrapper>
  );
};

export default Modal;
