import React from 'react';
import TextFiled from '../../../../components/TextFiled/TextField';
import SelectedOptionsTable from '../../components/SelectedOptionsTable/SelectedOptionsTable';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';
import {
  Container,
  TextFiledWrapper,
  NumberLabel,
} from '../../components/ResultWriter/ResultWriter.style';
import { SelectedOption } from '../TrueOrFalseResultFormSection/TrueOrFalseResultFormSection.type';

interface TypeFormProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  firstInputDisalbed?: boolean;
  secondLabel: string;
  secondContent: string;
  selectedOption: SelectedOption[];
  name: string;
}

const TrueOrFalseResultForm = ({
  index,
  firstLabel,
  secondLabel,
  firstInputDisalbed = false,
  selectedOption,
  name,
}: TypeFormProps): JSX.Element => {
  return (
    <Container>
      <SelectedOptionsTable selectedOption={selectedOption} />
      <NumberLabel>{'결과 작성'}</NumberLabel>
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

export default TrueOrFalseResultForm;
