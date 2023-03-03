import React, { forwardRef } from 'react';
import { Label, TextRadio, Wrapper } from './TextRadioButton.style';

interface TextRadioButtonProps {
  text: string;
  id: string;
  htmlFor: string;
  defaultChecked: boolean;
  index: number;
  onClick: () => void;
}

const TextRadioButton = forwardRef<HTMLInputElement, TextRadioButtonProps>(
  ({ onClick, text, id, htmlFor, defaultChecked, index, ...props }, ref) => {
    return (
      <Wrapper>
        <TextRadio
          {...props}
          ref={ref}
          value={index}
          type="radio"
          id={id}
          defaultChecked={defaultChecked}
          onClick={onClick}
        />
        <Label htmlFor={htmlFor}>{text}</Label>
      </Wrapper>
    );
  },
);

TextRadioButton.displayName = 'TextRadioButton';

export default TextRadioButton;
