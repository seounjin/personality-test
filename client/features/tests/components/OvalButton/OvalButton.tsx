import React from 'react';
import { Button } from './OvalButton.style';

interface OvalButtonProps {
  text: string;
  ariaLabel?: string;
  onClick: () => void;
}

const OvalButton = ({
  text,
  ariaLabel,
  onClick,
}: OvalButtonProps): JSX.Element => {
  return (
    <Button aria-label={ariaLabel} type="button" onClick={onClick}>
      {text}
    </Button>
  );
};

export default OvalButton;
