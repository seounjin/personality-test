import { InputForm } from '../components/InputForm/InputForm.type';
import {
  ResultContent,
  ResultItem,
} from '../features/admin/container/ResultCard/ResultCard.type';
import { SelectItem } from '../features/admin/container/SelectCard/SelectCard.type';

export interface AdminInitialState {
  userItem?: InputForm[];
  selectItems: SelectItem[];
  selectItemsVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[][];
  resultContents?: ResultContent[];
  imgUrl?: string;
}
