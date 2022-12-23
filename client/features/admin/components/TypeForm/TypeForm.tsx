import React from 'react';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextFiled from '../TextFiled/TextField';
import { Container, InputContainer, NumberLabel } from './TypeForm.style';

interface TypeFormProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  secondLabel: string;
  secondContent: string;
}

const TypeForm = ({
  index,
  firstLabel,
  secondLabel,
}: TypeFormProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{`${index + 1}번`}</NumberLabel>
      <InputContainer>
        <TextFiled
          label={firstLabel}
          name={`typeFormItems[${index}].typeContent`}
        />
      </InputContainer>
      <TextAreaInput
        label={secondLabel}
        name={`typeFormItems[${index}].explanationContent`}
      />
    </Container>
  );
};

export default TypeForm;
