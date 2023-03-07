import React from 'react';
import { Button } from './OvalButton.style';

interface OvalButtonProps {
  text: string;
  onClick: () => void;
}

const OvalButton = ({ text, onClick }: OvalButtonProps): JSX.Element => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default OvalButton;
