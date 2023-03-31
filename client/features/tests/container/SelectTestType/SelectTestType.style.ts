import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding-top: 150px;
  ${({ theme }) =>
    theme.device.laptop`
  flex-direction: column;
  padding-top: 50px;
  `}
`;
