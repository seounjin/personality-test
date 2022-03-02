import { useReducer, useCallback } from 'react';
import selectReducer from '../_reducers/adminReducer';
import fetcher from '../api/fetcher';
import {
  InitialState,
  Items,
  ResultItems,
} from '../components/SelectContainer/type';
import {
  APPROVE_ITEM,
  ADD_ITEM,
  CHANGE_ITEM,
  DELETE_ITEM,
  CHANGE_INPUT,
  SET_RESULT_CONTENT,
  CHANGE_USER_INPUT,
  WRITE_IMG,
  EXCUTE_ITEM,
} from '../_actions/adminAction';

const initialState: InitialState = {
  items: [
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
    { question: '', select_1: '', select_2: '' },
  ],
  isVisible: [true, true, true],
  isResultScreen: false,
  resultItems: [],
  resultContent: [],
  userItem: { title: '', id: '', password: '' },
};

interface UseAdmin {
  handleOk: (index: number) => void;
  handleDelete: (index: number) => void;
  handleAdd: () => void;
  handleApprove: () => void;
  handleTextArea: (event: any) => void;
  handleCreate: () => Promise<void>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImgUpload: (imgFile: any) => void;
  handleExcute: () => void;
  items: Items[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItems>[];
}

const useAdmin = (): UseAdmin => {
  const [state, dispatch] = useReducer(selectReducer, initialState);
  const { items, isVisible, isResultScreen, resultItems }: any = state;

  const handleOk = useCallback((index: number): void => {
    dispatch({ type: CHANGE_INPUT, index: index });
  }, []);

  const handleDelete = useCallback((index: number): void => {
    dispatch({ type: DELETE_ITEM, index: index });
  }, []);

  const handleAdd = useCallback((): void => {
    dispatch({ type: ADD_ITEM });
  }, []);

  const onChange = useCallback((event: any): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;

    dispatch({
      type: CHANGE_ITEM,
      index: index,
      value: value,
      name: name,
    });
  }, []);

  const handleTextArea = useCallback((event: any): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;
    dispatch({
      type: SET_RESULT_CONTENT,
      index: index,
      name: name,
      value: value,
    });
  }, []);

  const handleApprove = useCallback((): void => {
    dispatch({ type: APPROVE_ITEM });
  }, []);

  // 등록 요청
  const handleCreate = useCallback(async (): Promise<void> => {
    console.log('!!', state);

    const formData = new FormData();
    formData.append('user', JSON.stringify({ ...state.userItem }));
    formData.append('result', JSON.stringify(state.resultContent));
    formData.append('file', state.imgFile);

    const items = state.items.map((data, index) => {
      return { ...data, select_1_id: index * 2, select_2_id: index * 2 + 1 };
    });
    formData.append('items', JSON.stringify(items));

    const res = await fetcher('post', '/admin', formData);
    if (res.success) {
      alert('등록되었습니다.');
    }
  }, [state]);

  const handleUser = useCallback((event): void => {
    const { value, name } = event.target;
    dispatch({
      type: CHANGE_USER_INPUT,
      name: name,
      value: value,
    });
  }, []);

  const handleImgUpload = useCallback((imgFile: File): void => {
    dispatch({ type: WRITE_IMG, imgFile: imgFile });
  }, []);

  const handleExcute = useCallback((): void => {
    dispatch({ type: EXCUTE_ITEM });
  }, []);

  return {
    handleOk,
    handleDelete,
    handleAdd,
    handleApprove,
    handleTextArea,
    handleCreate,
    onChange,
    handleUser,
    handleImgUpload,
    handleExcute,
    items,
    isVisible,
    isResultScreen,
    resultItems,
  };
};

export default useAdmin;
