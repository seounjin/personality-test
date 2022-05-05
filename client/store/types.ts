import {
  Items,
  ResultItems,
  InpitFormType,
  ResultContents,
} from '../components/SelectContainer/type';

export interface AdminInitialState {
  userItem?: InpitFormType[];
  items: Items[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItems>[];
  resultContent?: ResultContents[];
  imgUrl?: string;
}
