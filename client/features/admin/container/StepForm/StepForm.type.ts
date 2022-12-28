import { WeightCheckboxes } from '../CheckboxWithLabel/CheckboxWithLabel.type';

interface OptionItems {
  option: string;
  weightCheckboxes: WeightCheckboxes[];
}

export interface SelectItems {
  question: string;
  optionItems: OptionItems[];
}

export interface TypeFormItem {
  typeContent: string;
  explanationContent: string;
}

export type FormData = {
  title: string;
  explain: string;
  typeFormItems: Array<TypeFormItem>;
  selectItems: SelectItems[];
  typesDictionary: object;
};
