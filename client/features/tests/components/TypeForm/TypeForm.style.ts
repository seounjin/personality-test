import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 768px;
  width: 100%;

  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    ${(props) => props.theme.colors.boxShadowBorderColor} 0px 0px 0px 2px;
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 30px;

  ${({ theme }) =>
    theme.device.mobile`
    box-shadow: none;
  `}
`;

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
`;

export const NumberLabel = styled.label`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0;
`;

export const HeaderWrapper = styled.div`
  font-size: 1.8rem;
  margin: 4px 0;
`;

export const TextFiledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 0;
  font-size: 1.8rem;
`;
