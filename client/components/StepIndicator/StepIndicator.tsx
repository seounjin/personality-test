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
  isStepActive: Array<boolean>;
  stepLabel: Array<string>;
}

const StepIndicator = ({
  isStepActive,
  stepLabel,
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
                  className={isStepActive[index - 1] ? 'active' : ''}
                />
              </>
            )}
            <StepWrapper>
              <Step isStepActive={isStepActive[index]}>
                {isStepActive[index] && <CheckIcon />}
              </Step>
              <Label isStepActive={isStepActive[index]}>{label}</Label>
            </StepWrapper>
          </StepContainer>
        );
      })}
    </Wrapper>
  );
};

export default StepIndicator;
