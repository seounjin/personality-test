import { useReducer, useCallback } from 'react';
import selectReducer from '../_reducers/adminReducer';
import fetcher from '../api/fetcher';
import {
  InitialState,
  Items,
  ResultItems,
  UserItem,
  ResultContents,
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
import { useRouter } from 'next/router';
import selectItemCombine from '../utils/selectItemCombine';

interface UseAdmin {
  handleOk: (index: number) => void;
  handleDelete: (index: number) => void;
  handleAdd: () => void;
  handleApprove: () => void;
  handleTextArea: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCreate: () => Promise<void>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUser: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImgUpload: (imgFile: File) => void;
  handleExcute: () => void;
  items: Items[];
  isVisible: Array<boolean>;
  isResultScreen: boolean;
  resultItems: Array<ResultItems>[];
  userItem?: UserItem;
  resultContent?: ResultContents[];
  imgUrl?: string;
}

interface AdminData {
  userItem: UserItem;
  items: Items[];
  resultContent: ResultContents[];
  imgUrl: string;
}

const initialState = (data?: AdminData): InitialState => {
  let tempItems = [];
  if (data) {
    const { resultItems } = selectItemCombine(data.items.length, data.items);
    tempItems = [...resultItems];
  }
  return {
    userItem: {
      title: data ? data.userItem.title : '',
      id: data ? data.userItem.id : '',
      password: data ? data.userItem.password : '',
    },
    items: data
      ? data.items
      : [
          { question: '', select_1: '', select_2: '' },
          { question: '', select_1: '', select_2: '' },
          { question: '', select_1: '', select_2: '' },
        ],
    isVisible: data ? data.items.map(() => false) : [true, true, true],
    isResultScreen: data ? true : false,
    resultItems: data ? tempItems : [],
    resultContent: data ? data.resultContent : [],
    imgUrl: data ? data.imgUrl : '',
  };
};

const useAdmin = (adminData?): UseAdmin => {
  const router = useRouter();

  const [state, dispatch] = useReducer(selectReducer, initialState(adminData));

  const {
    items,
    isVisible,
    isResultScreen,
    resultContent,
    resultItems,
    userItem,
    imgUrl,
  } = state;

  const handleOk = (index: number): void => {
    const { question, select_1, select_2 } = items[index];

    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch({ type: CHANGE_INPUT, index: index });
  };

  const handleDelete = useCallback((index: number): void => {
    dispatch({ type: DELETE_ITEM, index: index });
  }, []);

  const handleAdd = useCallback((): void => {
    dispatch({ type: ADD_ITEM });
  }, []);

  const onChange = useCallback((event): void => {
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

  const handleTextArea = useCallback((event): void => {
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

  const handleApprove = (): void => {
    const isCheck = isVisible.filter((data) => data === true);

    if (isCheck.length) {
      alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
      return;
    }

    dispatch({ type: APPROVE_ITEM });
  };

  // 등록 요청
  const handleCreate = useCallback(async (): Promise<void> => {
    // 유효성 검사
    if (!userItem.title || !userItem.id || !userItem.password) {
      alert('제목 아이디 비밀번호를 채워주세요');
      return;
    }

    for (let index = 0; index < resultContent.length; index++) {
      const { who, content } = resultContent[index];
      if (!who || !content) {
        alert('결과를 작성해 주세요');
        return;
      }
    }

    if (!state.imgFile) {
      alert('이미지를 올려주세요');
      return;
    }

    // formdata 생성
    const formData: FormData = new FormData();

    const { id } = router.query;

    if (id) {
      formData.append('test', JSON.stringify({ title: state.userItem.title }));
    } else {
      formData.append('user', JSON.stringify({ ...state.userItem }));
    }

    formData.append('results', JSON.stringify(state.resultContent));
    formData.append('file', state.imgFile);

    const items = state.items.map((data, index) => {
      return { ...data, select_1_id: index * 2, select_2_id: index * 2 + 1 };
    });
    formData.append('items', JSON.stringify(items));

    const endpoint = id ? `/tests/${id}/edit` : '/tests';
    try {
      const res = await fetcher('post', endpoint, formData);
      if (res.success) {
        alert('등록되었습니다.');
        router.push('/');
      } else {
        alert('등록이 실패하였습니다.');
      }
    } catch (error) {
      console.log('등록 및 수정 요청 에러', error);
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
    resultContent,
    userItem,
    imgUrl,
  };
};

export default useAdmin;
