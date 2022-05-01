import {
  Items,
  ResultItems,
  UserItem,
  ResultContents,
} from '../components/SelectContainer/type';

export interface AdminInitialState {
  items: Items[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItems>[];
  userItem?: UserItem;
  resultContent?: ResultContents[];
  imgUrl?: string;
}
