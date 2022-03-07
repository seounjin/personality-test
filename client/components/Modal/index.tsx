import Wrapper from './styles';

const Modal = ({ handleModal }) => {
  return (
    <Wrapper>
      <div className="overlay" onClick={handleModal}></div>
      <div className="modal"></div>
    </Wrapper>
  );
};

export default Modal;
