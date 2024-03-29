import React from 'react';
import { useController } from 'react-hook-form';
import HelperText from '../HelperText/HelperText';
import { Container, Label, Input, HelperTextWrapper } from './TextFiled.style';

interface TextFieldProps {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
}

const TextFiled = ({
  type = 'text',
  label,
  name,
  disabled = false,
}: TextFieldProps): JSX.Element => {
  const { field, fieldState } = useController({ name });

  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        name={name}
        {...field}
        autoComplete={type === 'password' ? 'new-password' : 'on'}
        disabled={disabled}
      />
      <HelperTextWrapper>
        {fieldState.error && <HelperText text={fieldState.error.message} />}
      </HelperTextWrapper>
    </Container>
  );
};

export default TextFiled;
