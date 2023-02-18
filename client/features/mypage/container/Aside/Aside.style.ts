import styled from 'styled-components';

export const Container = styled.aside`
    margin-top 50px;
    margin-right: 20px;

    ${({ theme }) =>
      theme.device.laptop`
      display: none;
  `}
`;
