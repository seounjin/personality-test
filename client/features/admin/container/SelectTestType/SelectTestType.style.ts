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
  padding-top: 200px;
  ${({ theme }) =>
    theme.device.laptop`
  flex-direction: column;
  padding-top: 0;
  `}
`;

export const ButtonWrapper = styled.div`
  margin: 20px;
`;
