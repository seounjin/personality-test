import React from 'react';
import { Wrapper } from './TextBox.style';

interface TextBoxProps {
  text?: string;
}

const TextBox = ({ text }: TextBoxProps) => {
  return <Wrapper>{text}</Wrapper>;
};

export default TextBox;
