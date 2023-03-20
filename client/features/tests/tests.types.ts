export interface Step {
  name?: string;
  Element: ({ handleNext }: StepComponentProps) => JSX.Element;
}

type StepComponentProps = { handleNext?: () => void };

export interface ResultFormItem {
  resultContent: string;
  explanationContent: string;
}

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
