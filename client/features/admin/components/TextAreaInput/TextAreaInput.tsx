import React from 'react';
import { useController } from 'react-hook-form';
import HelperText from '../HelperText/HelperText';
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
      {fieldState.error && (
        <HelperText text={fieldState.error.message}></HelperText>
      )}
    </Container>
  );
};

export default TextAreaInput;
