import React from 'react';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextFiled from '../../../../components/TextFiled/TextField';
import { Container, TextFiledWrapper, NumberLabel } from './TypeForm.style';

interface TypeFormProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  firstInputDisalbed?: boolean;
  secondLabel: string;
  secondContent: string;
  name: string;
}

const TypeForm = ({
  index,
  firstLabel,
  secondLabel,
  firstInputDisalbed = false,
  name,
}: TypeFormProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{`${index + 1}번`}</NumberLabel>
      <TextFiledWrapper>
        <TextFiled
          label={firstLabel}
          name={`${name}[${index}].typeContent`}
          disabled={firstInputDisalbed}
        />
      </TextFiledWrapper>
      <TextAreaInput
        label={secondLabel}
        name={`${name}[${index}].explanationContent`}
      />
    </Container>
  );
};

export default TypeForm;
