import React, { forwardRef } from 'react';
import {
  RefCallBack,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { Container, Label, Input } from './TextFiled.style';

interface TextfieldProps {
  label: string;
  name: string;
  errorText: string;
}

const TextFiled = forwardRef<
  HTMLInputElement,
  TextfieldProps | Partial<Exclude<UseFormRegisterReturn, { ref: RefCallBack }>>
>(({ label, name, errorText, ...props }: TextfieldProps, ref) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input name={name} ref={ref} {...props} />
    </Container>
  );
});

TextFiled.displayName = 'TextFiled';

export default TextFiled;
