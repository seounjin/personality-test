import { Container, Label, Input } from './InputForm.style';
import React from 'react';

interface InputFormProps {
  label: string;
  type: string;
  defaultValue: string;
  index?: number;
  optionIndex?: number;
  onChange: (props) => void;
}

const InputForm = ({
  label,
  type,
  defaultValue,
  index = 0,
  optionIndex = 0,
  onChange,
}: InputFormProps): JSX.Element => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        name={type}
        data-index={index}
        data-option-index={optionIndex}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Container>
  );
};

export default InputForm;
