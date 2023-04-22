import React from 'react';
import TextAreaInput from '../TextAreaInput/TextAreaInput';
import TextFiled from '../../../../components/TextFiled/TextField';
import { Container, TextFiledWrapper } from './ResultWriter.style';

interface ResultWriterProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  firstInputDisalbed?: boolean;
  secondLabel: string;
  secondContent: string;
  name: string;
}

const ResultWriter = ({
  index,
  firstLabel,
  secondLabel,
  firstInputDisalbed = false,
  name,
}: ResultWriterProps): JSX.Element => {
  return (
    <Container>
      <TextFiledWrapper>
        <TextFiled
          label={firstLabel}
          name={`${name}[${index}].resultContent`}
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

export default ResultWriter;
