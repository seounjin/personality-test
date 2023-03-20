export interface ScoreTestResultFormItem {
  resultContent: string;
  explanationContent: string;
}

export type ScoreTestResultFormItems = {
  scoreTestResultFormItems: ScoreTestResultFormItem[];
};

export interface WeightedScoreItem {
  typeContent: string;
  score: number;
}

export interface OptionItems {
  option: string;
  weightedScoreItems: WeightedScoreItem[];
}

export interface ScoreTestSelectFormItems {
  question: string;
  optionItems: OptionItems[];
}

export interface ScoreTestSliceInitialState {
  scoreTestResultItemsCount: number;
  numberOfItemsCount: number;
  scoreTestResultFormItems: ScoreTestResultFormItem[];
  scoreTestSelectFormItems: ScoreTestSelectFormItems[];
}

export type ScoreTestSelectFormItemsType = {
  scoreTestSelectFormItems: ScoreTestSelectFormItems[];
};
