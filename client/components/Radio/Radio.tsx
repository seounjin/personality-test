import React, { ReactNode } from 'react';
import { Input, Label, Span } from './Radio.style';

interface RadioProps {
  children: ReactNode;
  value: string;
  name: string;
  defaultChecked: boolean;
  disabled?: boolean;
}

const Radio = ({
  children,
  value,
  name,
  defaultChecked,
  disabled = false,
}: RadioProps): JSX.Element => {
  return (
    <Label>
      <Input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <Span> {children}</Span>
    </Label>
  );
};

export default Radio;
