import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  font-size: 20px;

  .poster-img {
    width: 100%;
  }

  .start-button-img {
    background-color: transparent;
    height: 52px;
    border: none;
    margin-top: 30px;
  }
`;

export default Wrapper;
