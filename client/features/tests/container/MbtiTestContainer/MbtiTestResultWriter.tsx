import React from 'react';
import TextFiled from '../../../../components/TextFiled/TextField';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';
import {
  Container,
  TextFiledWrapper,
} from '../../components/ResultWriter/ResultWriter.style';
import { NumberLabel } from '../../components/ResultFormBox/ResultFormBox.style';

interface MbtiTestResultWriterProps {
  index: number;
  firstLabel: string;
  firstInputDisalbed?: boolean;
  secondLabel: string;
  thirdLabel: string;
  name: string;
}

const MbtiTestResultWriter = ({
  index,
  firstLabel,
  secondLabel,
  thirdLabel,
  firstInputDisalbed = false,
  name,
}: MbtiTestResultWriterProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{`${index + 1}번`}</NumberLabel>
      <TextFiledWrapper>
        <TextFiled
          label={firstLabel}
          name={`${name}[${index}].mbtiType`}
          disabled={firstInputDisalbed}
        />
      </TextFiledWrapper>
      <TextFiledWrapper>
        <TextFiled
          label={secondLabel}
          name={`${name}[${index}].resultContent`}
        />
      </TextFiledWrapper>
      <TextAreaInput
        label={thirdLabel}
        name={`${name}[${index}].explanationContent`}
      />
    </Container>
  );
};

export default MbtiTestResultWriter;
