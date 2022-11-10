import { InputForm } from '../components/InputForm/InputForm.type';
import {
  ResultContent,
  ResultItem,
} from '../components/ResultCard/ResultCard.type';
import { SelectItem } from '../components/SelectCard/SelectCard.type';

export interface AdminInitialState {
  userItem?: InputForm[];
  items: SelectItem[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[];
  resultContent?: ResultContent[];
  imgUrl?: string;
}
