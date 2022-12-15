import { useState, useCallback } from 'react';
import {
  approveSelectItem,
  createSelectItems,
} from '../../store/modules/admin';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import { useRouter } from 'next/router';
import fetcher from '../../api/fetcher';

export const useImageUploadStep = () => {
  const [imgFile, setImgFile] = useState<File>(null);

  const handleImgFile = useCallback((imgFile: File) => {
    setImgFile(imgFile);
  }, []);

  return { imgFile, handleImgFile };
};

export const useSelectStep = () => {
  const dispatch = useDispatch();
  const createResultItems = () => dispatch(approveSelectItem());

  return { createResultItems };
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

  const setSelectFromStep = () => {
    dispatch(createSelectItems());
  };

  return {
    setSelectFromStep,
  };
};
