import styled from 'styled-components';

interface wrapper {
  height: string;
}

const Wrapper = styled.div<wrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375px;
  height: 100%;
  height: ${(props) => props.height};
  background: url(/background.jpg) no-repeat;
  background-size: cover;

  @media only screen and (max-width: 424px) {
    width: 100%;
  }
`;

export default Wrapper;
