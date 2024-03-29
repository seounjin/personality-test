import {
  BaseTestItems,
  SelectFormItems,
  WeightedScore,
} from '../../tests.types';

export interface ScoreTestResultFormItem {
  resultContent: string;
  explanationContent: string;
  resultImageUrl: string;
}

export type ScoreTestResultFormItems = {
  scoreTestResultFormItems: ScoreTestResultFormItem[];
};

export interface WeightedScoreItem {
  resultContent: string;
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
  isPublic: boolean;
  scoreTestResultFormItems: ScoreTestResultFormItem[];
  scoreTestSelectFormItems: ScoreTestSelectFormItems[];
  imageBase64DataArray: Array<string>;
}

export type ScoreTestSelectFormItemsType = {
  scoreTestSelectFormItems: ScoreTestSelectFormItems[];
};

export interface ScoreTestItems extends BaseTestItems {
  weightedScoreDictionary: WeightedScore;
  personalityItems: SelectFormItems[];
}
