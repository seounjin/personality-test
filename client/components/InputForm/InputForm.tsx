import { Container, Label, Input } from './InputForm.style';
import React from 'react';

interface InputFormProps {
  label: string;
  type: string;
  defaultValue: string;
  index?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({
  label,
  type,
  defaultValue,
  index,
  onChange,
}: InputFormProps): JSX.Element => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        name={type}
        data-index={index}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

export default InputForm;
