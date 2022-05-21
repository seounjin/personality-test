import { ReactNode } from 'react';
import Wrapper from './styles';

interface ModalProps {
  children: ReactNode;
  handleModal: () => void;
}

const Modal = ({ children, handleModal }: ModalProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="overlay" onClick={handleModal}></div>
      <div className="modal">{children}</div>
    </Wrapper>
  );
};

export default Modal;
