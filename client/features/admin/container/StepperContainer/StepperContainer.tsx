import React from 'react';
import Stepper from '../Stepper/Stepper';
import { Wrapper } from './StepperContainer.style';

interface StepperContainerProps {
  testType: string;
}

const StepperContainer = ({ testType }: StepperContainerProps): JSX.Element => {
  return (
    <Wrapper>
      <Stepper testType={testType} />
    </Wrapper>
  );
};

export default StepperContainer;
