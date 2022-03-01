export interface Items {
  question: string;
  select_1: string;
  select_2: string;
}

export interface ResultItems {
  questionNumber: number;
  selectNumber: number;
  question: string;
  content: string;
}

export interface ResultContent {
  index: number;
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
  resultContent: ResultContent[];
  userItem: UserItem;
  imgFile?: File;
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
