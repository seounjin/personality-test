export interface WeightedScoreItem {
  type: string;
  score: number;
}

interface OptionItems {
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
