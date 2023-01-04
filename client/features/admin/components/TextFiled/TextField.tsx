import React from 'react';
import { useController } from 'react-hook-form';
import HelperText from '../HelperText/HelperText';
import { Container, Label, Input, HelperTextWrapper } from './TextFiled.style';

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
        {fieldState.error && <HelperText text={fieldState.error.message} />}
      </HelperTextWrapper>
    </Container>
  );
};

export default TextFiled;
