import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 668px;
  background: url(/background.jpg) no-repeat;
  background-size: cover;

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
  }
`;

export default Wrapper;
