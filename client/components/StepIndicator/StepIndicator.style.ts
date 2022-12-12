import styled, { keyframes } from 'styled-components';
import { StepProps, LabelProps } from './StepIndicator.type';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 40px 0;
  font-size: 1.2rem;
`;

export const StepContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Step = styled.div<StepProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 4px;
  border-radius: 50%;
  border: ${({ theme, isCurrentStep }) =>
    isCurrentStep ? `4px solid ${theme.colors.progressBarColor}` : 'none'};
  background: ${({ theme, isCurrentStep, isStepActive }) =>
    isCurrentStep
      ? theme.colors.white
      : isStepActive
      ? theme.colors.progressBarColor
      : theme.colors.lightGray};
`;

const animate = keyframes`
  100% {
    transform: scaleX(1);
  }
`;

export const BasicBar = styled.div`
  position: absolute;
  height: 4px;
  top: 15px;
  left: calc(-50% + 20px);
  right: calc(50% + 20px);
  background: ${({ theme }) => theme.colors.lightGray};
`;

export const ProgressBar = styled(BasicBar)`
  z-index: 1;
  &.active {
    background: ${({ theme }) => theme.colors.progressBarColor};
    transform: scaleX(0);
    transform-origin: left;
    animation: ${animate} 0.3s linear forwards;
  }
`;

export const Label = styled.label<LabelProps>`
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  padding: 6px;
  color: ${({ theme, isCurrentStep }) =>
    isCurrentStep ? theme.colors.black : theme.colors.lightGray};
`;
