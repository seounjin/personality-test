import { SelectFormItems } from '../../types';

export interface ResultItems {
  resultContent: string;
  explanationContent: string;
}

export interface MbtiResultItems extends ResultItems {
  mbtiType: string;
}

export interface Error {
  statusCode: number;
  message: string;
}

export interface WeightedScore {
  [key: string]: number;
}

interface BaseTestItems {
  title: string;
  subTitle: string;
  explain: string;
  id: string;
  testType: string;
  isPublic: boolean;
}

export type PersonalityItems = SelectFormItems;

export interface RawTestItems extends BaseTestItems {
  items: Array<SelectItems>;
}

export interface SelectItems {
  selectItems: SelectFormItems[];
}

export interface ScoreTestItems extends BaseTestItems {
  weightedScoreDictionary: WeightedScore;
  personalityItems: PersonalityItems[];
}

export type MbtiTestItems = ScoreTestItems;

export interface TrueOrFalseTestItems extends BaseTestItems {
  personalityItems: PersonalityItems[];
}
