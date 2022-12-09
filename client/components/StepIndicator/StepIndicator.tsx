import React from 'react';
import {
  Step,
  StepContainer,
  Wrapper,
  Label,
  BasicBar,
  ProgressBar,
  StepWrapper,
} from './StepIndicator.style';

interface StepLabel {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  isStepActive: Array<boolean>;
  stepLabel: StepLabel[];
}

const StepIndicator = ({
  isStepActive,
  stepLabel,
}: StepIndicatorProps): JSX.Element => {
  return (
    <Wrapper>
      {stepLabel.map(({ id, label }, index) => {
        return (
          <StepContainer key={id}>
            {index !== 0 && (
              <>
                <BasicBar />
                <ProgressBar
                  className={isStepActive[index - 1] ? 'active' : ''}
                />
              </>
            )}
            <StepWrapper>
              <Step isStepActive={isStepActive[index]} />
              <Label>{label}</Label>
            </StepWrapper>
          </StepContainer>
        );
      })}
    </Wrapper>
  );
};

export default StepIndicator;
