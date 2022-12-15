import { InputForm } from '../components/InputForm/InputForm.type';
import {
  ResultContent,
  ResultItem,
} from '../features/admin/container/ResultCard/ResultCard.type';
import { SelectItems } from '../features/admin/container/SelectCard/SelectCard.type';
import { TypeItems } from '../features/admin/components/TypeForm/TypeForm.type';

export interface AdminInitialState {
  userItem: InputForm[];
  titleItems: InputForm[];
  selectItems: SelectItems[];
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[][];
  resultContents?: ResultContent[];
  imgUrl?: string;
  typeItems: TypeItems[];
  optionItemsCount: number;
  numberOfItemsCount: number;
}
