import React from 'react';
import { P } from './HelperText.style';

interface HelperTextProps {
  text: string;
}

const HelperText = ({ text }: HelperTextProps): JSX.Element => {
  return <P>{text}</P>;
};

export default HelperText;
