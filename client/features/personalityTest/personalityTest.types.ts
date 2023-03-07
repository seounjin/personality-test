import { SelectFormItems } from '../../types';

export interface ResultItems {
  typeContent: string;
  explanationContent: string;
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
