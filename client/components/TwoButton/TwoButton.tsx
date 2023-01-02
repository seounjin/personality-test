import React from 'react';
import { Wrapper, Button } from './TwoButton.style';

interface TwoButtonProps {
  leftButton?: (...props) => void;
  rightButton?: (...props) => void;
  leftName: string;
  rightName: string;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  leftType?: 'button' | 'submit' | 'reset';
  rightType?: 'button' | 'submit' | 'reset';
  form?: string;
}

const TwoButton = ({
  leftButton,
  rightButton,
  leftName,
  rightName,
  leftDisabled = false,
  rightDisabled = false,
  leftType = 'button',
  rightType = 'button',
  form = '',
}: TwoButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <Button
        type={leftType}
        form={form}
        disabled={leftDisabled}
        onClick={leftButton}
      >
        {leftName}
      </Button>
      <Button
        type={rightType}
        form={form}
        disabled={rightDisabled}
        onClick={rightButton}
      >
        {rightName}
      </Button>
    </Wrapper>
  );
};

export default TwoButton;
