import React from 'react';
import { Wrapper } from './RoundButton.style';

interface RoundButtonProps {
  text: string;
  ariaLabel: string;
  onClick: () => void;
}

const RoundButton = ({
  text,
  ariaLabel,
  onClick,
}: RoundButtonProps): JSX.Element => {
  return (
    <Wrapper type="button" aria-label={ariaLabel} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default RoundButton;
