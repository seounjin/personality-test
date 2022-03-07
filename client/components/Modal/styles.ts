import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.6);
  }
  .modal {
    width: 500px;
    position: relative;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    border-radius: 18px;
  }
`;

export default Wrapper;