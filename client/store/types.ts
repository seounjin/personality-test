import { InputForm } from '../components/InputForm/InputForm.type';
import {
  ResultContent,
  ResultItem,
} from '../features/admin/container/ResultCard/ResultCard.type';
import { SelectItem } from '../features/admin/container/SelectCard/SelectCard.type';
import { TypeItems } from '../features/admin/components/TypeForm/TypeForm.type';

export interface AdminInitialState {
  userItem: InputForm[];
  titleItems: InputForm[];
  selectItems: SelectItem[];
  selectItemsVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[][];
  resultContents?: ResultContent[];
  imgUrl?: string;
  typeItems: TypeItems[];
  typeItemsCount: number;
}
