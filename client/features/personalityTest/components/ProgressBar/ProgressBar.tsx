import React from 'react';
import {
  Wrapepr,
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
    <Wrapepr>
      <TextWrapper>
        <Text> {activeStep + '/' + totalStep}</Text>
      </TextWrapper>
      <BarWrapper>
        <BeheindBar>
          <ForwardBar width={(activeStep / totalStep) * 100} />
        </BeheindBar>
      </BarWrapper>
    </Wrapepr>
  );
};

export default ProgressBar;
