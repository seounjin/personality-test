import React from 'react';
import {
  Container,
  Label,
  Input,
  Textarea,
  InputContainer,
  HeaderWrapper,
  TextareaContainer,
  NumberLabel,
} from './TypeForm.style';
import { TypeItems } from './TypeForm.type';

interface TypeFormProps extends TypeItems {
  index: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const TypeForm = ({
  index,
  firstLabel,
  firstContent,
  secondLabel,
  secondContent,
  onChange,
}: TypeFormProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{`${index + 1}번`}</NumberLabel>
      <InputContainer>
        <Label>{firstLabel}</Label>
        <Input
          name={'firstContent'}
          data-index={index}
          onChange={onChange}
          defaultValue={firstContent}
        />
      </InputContainer>
      <TextareaContainer>
        <Label>{secondLabel}</Label>
        <Textarea
          name={'secondContent'}
          data-index={index}
          onChange={onChange}
          defaultValue={secondContent}
        />
      </TextareaContainer>
    </Container>
  );
};

export default TypeForm;
