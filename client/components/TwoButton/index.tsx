import React from 'react';
import Wrapper from './styles';

interface TwoButtonProps {
  leftButton: () => void;
  rightButton: () => void;
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
      <button onClick={leftButton}>{leftName}</button>
      <button onClick={rightButton}>{rightName}</button>
    </Wrapper>
  );
};

export default React.memo(TwoButton);
