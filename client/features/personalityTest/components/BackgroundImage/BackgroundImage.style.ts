import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundImageColor};
`;

export default Wrapper;
