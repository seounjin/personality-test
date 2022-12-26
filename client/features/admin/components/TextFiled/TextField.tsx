import React from 'react';
import { useController } from 'react-hook-form';
import HelperText from '../HelperText/HelperText';
import { Container, Label, Input } from './TextFiled.style';

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
      {fieldState.error && (
        <HelperText text={fieldState.error.message}></HelperText>
      )}
    </Container>
  );
};

export default TextFiled;
