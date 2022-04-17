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
    position: relative;
    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    background-color: #fff;

    .modal_button {
      margin-top: 2rem;
    }
  }
`;

export default Wrapper;
