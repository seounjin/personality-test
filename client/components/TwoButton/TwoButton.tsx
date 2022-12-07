import React from 'react';
import { Wrapper, Button } from './TwoButton.style';

interface TwoButtonProps {
  leftButton: (...props) => void;
  rightButton: (...props) => void;
  leftName: string;
  rightName: string;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}

const TwoButton = ({
  leftButton,
  rightButton,
  leftName,
  rightName,
  leftDisabled = false,
  rightDisabled = false,
}: TwoButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <Button disabled={leftDisabled} onClick={leftButton}>
        {leftName}
      </Button>
      <Button disabled={rightDisabled} onClick={rightButton}>
        {rightName}
      </Button>
    </Wrapper>
  );
};

export default TwoButton;
