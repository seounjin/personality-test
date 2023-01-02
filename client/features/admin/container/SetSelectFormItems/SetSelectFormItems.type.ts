import { WeightCheckboxes } from '../CheckboxWithLabel/CheckboxWithLabel.type';

interface OptionItems {
  option: string;
  weightCheckboxes: WeightCheckboxes[];
}

export interface SelectFormItems {
  question: string;
  optionItems: OptionItems[];
}

export type SelectFormValues = {
  selectFormItems: SelectFormItems[];
};
