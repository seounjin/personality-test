import React from 'react';
import { useController } from 'react-hook-form';
import {
  Container,
  Label,
  Input,
  HelperText,
  HelperTextWrapper,
} from './TextFiled.style';

interface TextFieldProps {
  label: string;
  name: string;
}

const TextFiled = ({ label, name }: TextFieldProps): JSX.Element => {
  const { field, fieldState } = useController({ name });

  return (
    <Container>
      <Label>{label}</Label>
      <Input name={name} {...field} />
      <HelperTextWrapper>
        <HelperText>{fieldState.error && fieldState.error.message}</HelperText>
      </HelperTextWrapper>
    </Container>
  );
};

export default TextFiled;
