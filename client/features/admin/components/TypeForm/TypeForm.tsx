import React from 'react';
import {
  Container,
  Label,
  Input,
  Textarea,
  InputContainer,
  TextareaContainer,
  NumberLabel,
} from './TypeForm.style';

interface TypeFormProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  secondLabel: string;
  secondContent: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TypeForm = ({
  index,
  firstLabel,
  firstContent,
  secondLabel,
  secondContent,
  handleInput,
  handleTextarea,
}: TypeFormProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{`${index + 1}번`}</NumberLabel>
      <InputContainer>
        <Label>{firstLabel}</Label>
        <Input
          name={'firstContent'}
          data-index={index}
          onChange={handleInput}
          defaultValue={firstContent}
        />
      </InputContainer>
      <TextareaContainer>
        <Label>{secondLabel}</Label>
        <Textarea
          name={'secondContent'}
          data-index={index}
          onChange={handleTextarea}
          defaultValue={secondContent}
        />
      </TextareaContainer>
    </Container>
  );
};

export default TypeForm;
