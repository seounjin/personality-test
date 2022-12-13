import { useState, useCallback } from 'react';
import { approveSelectItem, setSelectItems } from '../../store/modules/admin';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import { InputForm } from '../../components/InputForm/InputForm.type';
import _mapObject from '../../utils/_mapObject';
import { SelectItem } from './container/SelectCard/SelectCard.type';
import { useRouter } from 'next/router';
import fetcher from '../../api/fetcher';
import { MIN_NUMBER_OF_ITEMS_VALUE } from './admin.const';

export const useImageUploadStep = () => {
  const [imgFile, setImgFile] = useState<File>(null);

  const handleImgFile = useCallback((imgFile: File) => {
    setImgFile(imgFile);
  }, []);

  return { imgFile, handleImgFile };
};

type ParseItem = InputForm;

interface useParseItemProps {
  item: SelectItem[];
  index: number;
}

export const useParseItem = ({
  item,
  index,
}: useParseItemProps): ParseItem[] => {
  const pretreatment = (key: string, items: SelectItem[], index: number) => ({
    label:
      key === 'question'
        ? `질문`
        : key === 'select_1'
        ? '1번선택지'
        : '2번선택지',
    type: key,
    defaultValue: items[key],
  });

  const [parsetItem] = useState<ParseItem[]>(
    _mapObject(pretreatment, item, index),
  );

  return parsetItem;
};

export const useSelectStep = () => {
  const dispatch = useDispatch();
  const { selectItemsVisible } = useSelector(
    (state: RootState) => ({
      selectItemsVisible: state.admin.selectItemsVisible,
    }),
    shallowEqual,
  );

  const isSelectItemsVisible = () =>
    selectItemsVisible.every((data: boolean) => data);

  const createResultItems = () => dispatch(approveSelectItem());

  return { isSelectItemsVisible, createResultItems };
};

export const useResultStep = (ImgFile: File) => {
  const router = useRouter();
  const { userItem, titleItems, selectItems, resultContents } = useSelector(
    (state: RootState) => ({
      userItem: state.admin.userItem,
      titleItems: state.admin.titleItems,
      selectItems: state.admin.selectItems,
      resultContents: state.admin.resultContents,
    }),
    shallowEqual,
  );

  const isNotValidUserItem = (): boolean =>
    !userItem[0].defaultValue || !userItem[1].defaultValue;

  const isNotValidResultContent = (): boolean =>
    resultContents.filter(({ who, content }) => !who || !content).length
      ? true
      : false;

  const createFormData = (isId: boolean): FormData => {
    const formData: FormData = new FormData();

    formData.append(
      isId ? 'test' : 'user',
      JSON.stringify(
        isId
          ? { title: userItem[0].defaultValue }
          : {
              id: userItem[0].defaultValue,
              password: userItem[1].defaultValue,
            },
      ),
    );

    formData.append(
      'title',
      JSON.stringify({
        title: titleItems[0].defaultValue,
        explain: titleItems[1].defaultValue,
      }),
    );
    formData.append('results', JSON.stringify(resultContents));
    formData.append('file', ImgFile);
    formData.append(
      'items',
      JSON.stringify(
        selectItems.map((data, index) => ({
          ...data,
          select_1_id: index * 2,
          select_2_id: index * 2 + 1,
        })),
      ),
    );

    return formData;
  };

  const handleSubmit = async (): Promise<void> => {
    if (isNotValidUserItem()) {
      alert('제목 아이디 비밀번호를 채워주세요');
      return;
    }

    if (isNotValidResultContent()) {
      alert('결과를 작성해 주세요');
    }

    if (!ImgFile) {
      alert('이미지를 올려주세요');
      return;
    }
    const { id } = router.query;
    const isId = id ? true : false;
    const formData = createFormData(isId);

    try {
      const res = await fetcher(
        'post',
        id ? `/tests/${id}/edit` : '/tests',
        formData,
      );
      if (res.success) {
        alert('등록되었습니다.');
        router.push('/');
      } else {
        alert('등록이 실패하였습니다.');
      }
    } catch (error) {
      console.log('등록 및 수정 요청 에러', error);
    }
  };
  return { handleSubmit };
};

export const useSetSelectFormStep = () => {
  const dispatch = useDispatch();

  const [numberOfItems, setNumberOfItems] = useState<number>(
    MIN_NUMBER_OF_ITEMS_VALUE,
  );

  const setSelectFromStep = () => {
    dispatch(setSelectItems({ value: numberOfItems }));
  };

  const decreaseNumberOfItems = () => {
    setNumberOfItems((numberOfItems) => numberOfItems - 1);
  };

  const inCreaseNumberofItems = () => {
    setNumberOfItems((numberOfItems) => numberOfItems + 1);
  };

  return {
    numberOfItems,
    setSelectFromStep,
    decreaseNumberOfItems,
    inCreaseNumberofItems,
  };
};
