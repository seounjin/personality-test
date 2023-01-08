import { Types } from "mongoose";

export interface ResultItem {
  typeContent: string;
  explanationContent: string;
}

export interface Personality {
  title: string;
  explain: string;
  resultItems?: Types.ObjectId;
  SelectItems?: Types.ObjectId;
}

export interface OptionValuesToSelect {
  selectItems: Options[];
}

interface Options {
  question: string;
  optionItems: OptionItems[];
}

interface OptionItems {
  option: string;
  weightedScoreItems: WeightedScoreItem[];
}

interface WeightedScoreItem {
  typeContent: string;
  score: number;
}
