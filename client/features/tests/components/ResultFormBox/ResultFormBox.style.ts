import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;
  gap: 40px;

  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    ${(props) => props.theme.colors.boxShadowBorderColor} 0px 0px 0px 2px;
  border-radius: 8px;
  margin-bottom: 40px;

  ${({ theme }) =>
    theme.device.mobile`
    box-shadow: none;
  `}
`;

export const NumberLabel = styled.label`
  font-size: 21px;
  font-weight: bold;
  margin-top: 40px;
`;
