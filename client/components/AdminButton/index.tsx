import React from 'react';
import Wrapper from './styles';

interface AdminButtonProps {
  leftButton: () => void;
  rightButton: () => void;
  leftName: string;
  rightName: string;
}

const AdminButton = ({
  leftButton,
  rightButton,
  leftName,
  rightName,
}: AdminButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <button onClick={leftButton}>{leftName}</button>
      <button onClick={rightButton}>{rightName}</button>
    </Wrapper>
  );
};

export default React.memo(AdminButton);
