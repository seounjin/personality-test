import { TypeFormItems } from '../../components/ResultWriter/ResultWriter.type';

export interface SelectedOption {
  qusetionNumber: number;
  question: string;
  optionId: string;
  option: string;
  optionNumber: number;
}

export interface TrueOrFalseResultFormItems extends TypeFormItems {
  selectedOption: SelectedOption[];
}

export type TrueOrFalseResultFormValues = {
  trueOrFalseResultFormItems: TrueOrFalseResultFormItems[];
};
