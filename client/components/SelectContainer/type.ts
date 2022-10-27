export interface Items {
  question: string;
  select_1: string;
  select_2: string;
}

export interface InpitFormType {
  label: string;
  type: string;
  defaultValue: string;
}

export interface ResultItems {
  label: string;
  defaultValue: string;
}

export interface ResultContents {
  id: number;
  content: string;
  who: string;
}

export interface UserItem {
  title: string;
  id: string;
  password: string;
}

export interface InitialState {
  items: Items[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItems>[];
  resultContent: ResultContents[];
  userItem: UserItem;
  imgFile?: File;
  imgUrl?: string;
}

export type Action =
  | { type: 'ADD_ITEM' }
  | { type: 'DELETE_ITEM'; index: number }
  | { type: 'APPROVE_ITEM' }
  | { type: 'CHANGE_ITEM'; index: number; value: string; name: string }
  | { type: 'CHANGE_INPUT'; index: number }
  | { type: 'CHANGE_USER_INPUT'; value: string; name: string }
  | { type: 'SET_RESULT_CONTENT'; index: number; name: string; value: string }
  | { type: 'WRITE_IMG'; imgFile: any }
  | { type: 'EXCUTE_ITEM' };
