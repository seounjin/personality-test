import { OptionItems } from '../SetSelectFormItems/SetSelectFormItems.type';

interface TrueOrFalseOptionItems
  extends Omit<OptionItems, 'weightedScoreItems'> {
  id: string;
}

export interface TrueOrFalseSelectFormItems {
  question: string;
  optionItems: TrueOrFalseOptionItems[];
}

export type TrueOrFalseSelectFormValues = {
  trueOrFalseSelectFormItems: TrueOrFalseSelectFormItems[];
};
