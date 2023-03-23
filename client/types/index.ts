export interface WeightedScoreItem {
  typeContent: string;
  score: number;
}

export interface OptionItems {
  option: string;
  weightedScoreItems?: WeightedScoreItem[];
}

export interface SelectFormItems {
  question: string;
  optionItems: OptionItems[];
}
