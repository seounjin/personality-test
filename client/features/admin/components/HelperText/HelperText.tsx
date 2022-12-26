import React from 'react';
import { P, Wrapper } from './HelperText.style';

interface HelperTextProps {
  text: string;
}

const HelperText = ({ text }: HelperTextProps): JSX.Element => {
  return (
    <Wrapper>
      <P>{text}</P>
    </Wrapper>
  );
};

export default HelperText;
