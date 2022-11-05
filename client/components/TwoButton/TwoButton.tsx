import React from 'react';
import { Wrapper, Button } from './TwoButton.style';

interface TwoButtonProps {
  leftButton: (...props) => void;
  rightButton: (...props) => void;
  leftName: string;
  rightName: string;
}

const TwoButton = ({
  leftButton,
  rightButton,
  leftName,
  rightName,
}: TwoButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <Button onClick={leftButton}>{leftName}</Button>
      <Button onClick={rightButton}>{rightName}</Button>
    </Wrapper>
  );
};

export default TwoButton;
