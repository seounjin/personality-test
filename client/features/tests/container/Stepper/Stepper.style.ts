import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
  background-color: ${(props) => props.theme.colors.stepBackgroundColor};
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    ${(props) => props.theme.colors.boxShadowBorderColor} 0px 0px 0px 1px;
  border-radius: 8px;
  min-height: 100%;
  ${({ theme }) =>
    theme.device.mobile`
border-radius: 0;
box-shadow: none;`}
`;

export const TwoButtonWrapper = styled.div`
  margin: 12px;
`;

export const StepTitle = styled.h1``;

export const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  font-size: 1.4rem;
`;

export const QuestionMarkButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
`;
