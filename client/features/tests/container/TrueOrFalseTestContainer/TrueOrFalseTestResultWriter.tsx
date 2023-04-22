import SelectedOptionsTable from '../../components/SelectedOptionsTable/SelectedOptionsTable';
import {
  Container,
  TextFiledWrapper,
} from '../../components/ResultWriter/ResultWriter.style';
import { SelectedOption } from './trueOrFalseTest.type';
import TextFiled from '../../../../components/TextFiled/TextField';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';
import { NumberLabel } from '../../components/ResultFormBox/ResultFormBox.style';

interface TrueOrFalseTestResultWriterProps {
  index: number;
  firstLabel: string;
  firstContent: string;
  firstInputDisalbed?: boolean;
  secondLabel: string;
  secondContent: string;
  selectedOption: SelectedOption[];
  name: string;
}

const TrueOrFalseTestResultWriter = ({
  index,
  firstLabel,
  secondLabel,
  firstInputDisalbed = false,
  selectedOption,
  name,
}: TrueOrFalseTestResultWriterProps): JSX.Element => {
  return (
    <Container>
      <SelectedOptionsTable selectedOption={selectedOption} />
      <NumberLabel>{'결과 작성'}</NumberLabel>
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

export default TrueOrFalseTestResultWriter;
