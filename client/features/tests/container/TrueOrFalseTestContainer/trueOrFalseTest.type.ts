import { OptionItems, ResultFormItem } from '../../tests.types';

export interface TrueOrFalseTestSliceInitialState {
  numberOfItemsCount: number;
  trueOrFalseTestSelectFormItems: TrueOrFalseTestSelectFormItem[];
  trueOrFalseTestResultFormItems: TrueOrFalseTestResultFormItem[];
  isPublic: boolean;
}

interface TrueOrFalseTestOptionItem
  extends Omit<OptionItems, 'weightedScoreItems'> {
  id: string;
}

export interface TrueOrFalseTestSelectFormItem {
  question: string;
  optionItems: TrueOrFalseTestOptionItem[];
}

export type TrueOrFalseTestSelectFormValues = {
  trueOrFalseTestSelectFormItems: TrueOrFalseTestSelectFormItem[];
};

export interface SelectedOption {
  qusetionNumber: number;
  question: string;
  optionId: string;
  option: string;
  optionNumber: number;
}

export interface TrueOrFalseTestResultFormItem extends ResultFormItem {
  selectedOptionNumber: string;
  selectedOption: SelectedOption[];
}

export type TrueOrFalseTestResultFormValues = {
  trueOrFalseTestResultFormItems: TrueOrFalseTestResultFormItem[];
};
