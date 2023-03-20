export interface WeightedScoreItem {
  resultContent: string;
  score: number;
}

export interface OptionItems {
  option: string;
  weightedScoreItems: WeightedScoreItem[];
}

export interface SelectFormItems {
  question: string;
  optionItems: OptionItems[];
}

export type SelectFormValues = {
  selectFormItems: SelectFormItems[];
};
