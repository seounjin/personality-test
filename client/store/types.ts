import { InputForm } from '../components/InputForm/InputForm.type';
import {
  ResultContent,
  ResultItem,
} from '../features/admin/container/ResultCard/ResultCard.type';
import { SelectItem } from '../features/admin/container/SelectCard/SelectCard.type';

export interface AdminInitialState {
  userItem?: InputForm[];
  items: SelectItem[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[];
  resultContent?: ResultContent[];
  imgUrl?: string;
}
