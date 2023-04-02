import React from 'react';
import {
  Wrapper,
  BarWrapper,
  BeheindBar,
  ForwardBar,
  Text,
  TextWrapper,
} from './ProgressBar.style';

interface ProgressBarProps {
  totalStep: number;
  activeStep: number;
}

const ProgressBar = ({
  totalStep = 10,
  activeStep = 1,
}: ProgressBarProps): JSX.Element => {
  return (
    <Wrapper>
      <TextWrapper>
        <Text> {activeStep + '/' + totalStep}</Text>
      </TextWrapper>
      <BarWrapper>
        <BeheindBar>
          <ForwardBar width={(activeStep / totalStep) * 100} />
        </BeheindBar>
      </BarWrapper>
    </Wrapper>
  );
};

export default ProgressBar;
