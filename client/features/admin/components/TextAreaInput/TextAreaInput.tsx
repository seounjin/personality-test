import React from 'react';
import { useController } from 'react-hook-form';
import { HelperTextWrapper, HelperText } from '../TextFiled/TextFiled.style';
import { Container, Label, Textarea } from './TextAreaInput.style';

interface TextFieldProps {
  label: string;
  name: string;
}

const TextAreaInput = ({ label, name }: TextFieldProps): JSX.Element => {
  const { field, fieldState } = useController({ name });

  return (
    <Container>
      <Label>{label}</Label>
      <Textarea {...field} />
      <HelperTextWrapper>
        <HelperText>{fieldState.error && fieldState.error.message}</HelperText>
      </HelperTextWrapper>
    </Container>
  );
};

export default TextAreaInput;
