import React from 'react';
import CheckIcon from '../CheckIcon/CheckIcon';
import {
  Step,
  StepContainer,
  Wrapper,
  Label,
  BasicBar,
  ProgressBar,
  StepWrapper,
} from './StepIndicator.style';

interface StepIndicatorProps {
  isActiveStep: Array<boolean>;
  stepLabel: Array<string>;
  currentStep: number;
}

const StepIndicator = ({
  isActiveStep,
  stepLabel,
  currentStep,
}: StepIndicatorProps): JSX.Element => {
  return (
    <Wrapper>
      {stepLabel.map((label, index) => {
        return (
          <StepContainer key={`s${index}`}>
            {index !== 0 && (
              <>
                <BasicBar />
                <ProgressBar
                  className={isActiveStep[index - 1] ? 'active' : ''}
                />
              </>
            )}
            <StepWrapper>
              <Step
                isStepActive={isActiveStep[index]}
                isCurrentStep={currentStep === index}
              >
                {currentStep !== index && isActiveStep[index] && <CheckIcon />}
              </Step>
              <Label isCurrentStep={currentStep === index}>{label}</Label>
            </StepWrapper>
          </StepContainer>
        );
      })}
    </Wrapper>
  );
};

export default StepIndicator;
