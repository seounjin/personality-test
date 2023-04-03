import {
  BaseTestItems,
  SelectFormItems,
  WeightedScore,
} from '../../tests.types';

export interface ScoreTestItems extends BaseTestItems {
  weightedScoreDictionary: WeightedScore;
  personalityItems: SelectFormItems[];
}
