import { InputForm } from '../components/InputForm/InputForm.type';
import { ResultContent, ResultItem } from '../components/ResultContainer/type';
import { SelectItem } from '../components/SelectForm/SelectForm.type';

export interface AdminInitialState {
  userItem?: InputForm[];
  items: SelectItem[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItem>[];
  resultContent?: ResultContent[];
  imgUrl?: string;
}
