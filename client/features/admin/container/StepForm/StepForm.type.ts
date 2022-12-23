import { SelectItems } from '../SelectCard/SelectCard.type';

export interface TypeFormItem {
  labelType: string;
  typeContent: string;
  labelExplanation: string;
  explanationContent: string;
}

export type FormData = {
  title: string;
  explain: string;
  typeFormItems: Array<TypeFormItem>;
  selectItems: SelectItems[];
};
