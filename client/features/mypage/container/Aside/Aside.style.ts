import styled from 'styled-components';

export const Container = styled.div`
    margin-top 50px;
    ${({ theme }) =>
      theme.device.laptop`
  display: none;
  `}
`;
