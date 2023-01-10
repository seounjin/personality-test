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

export interface RawPersonalityItem {
  title: string;
  explain: string;
  id: string;
  items: Array<SelectItems>;
}

export interface SelectItems {
  selectItems: SelectFormItems[];
}
