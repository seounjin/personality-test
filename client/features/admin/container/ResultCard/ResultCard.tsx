import React, { useCallback } from 'react';
import { Container } from './ResultCard.style';
import ResultForm from '../../components/ResultForm/ResultForm';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  setResultContent,
  excuteResultItem,
} from '../../../../store/modules/admin';
import { RootState } from '../../../../store/modules';
import { useRouter } from 'next/router';
import fetcher from '../../../../api/fetcher';

const MResultForm = React.memo(ResultForm);

interface ResultCardProps {
  ImgFile: File;
}

const ResultCard = ({ ImgFile }: ResultCardProps): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userItem, items, resultItems, resultContent } = useSelector(
    (state: RootState) => ({
      userItem: state.admin.userItem,
      items: state.admin.items,
      resultItems: state.admin.resultItems,
      resultContent: state.admin.resultContent,
    }),
    shallowEqual,
  );

  const handleTextArea = useCallback((event): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;

    dispatch(setResultContent({ name, value, index }));
  }, []);

  const handleCancel = (): void => {
    dispatch(excuteResultItem());
  };

  const isNotValidUserItem = (): boolean =>
    !userItem[0].defaultValue ||
    !userItem[1].defaultValue ||
    !userItem[2].defaultValue;

  const isNotValidResultContent = (): boolean =>
    resultContent.filter(({ who, content }) => !who || !content).length
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
              title: userItem[0].defaultValue,
              id: userItem[1].defaultValue,
              password: userItem[2].defaultValue,
            },
      ),
    );
    formData.append('results', JSON.stringify(resultContent));
    formData.append('file', ImgFile);
    formData.append(
      'items',
      JSON.stringify(
        items.map((data, index) => ({
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

  return (
    <Container>
      {resultItems.map((items, index) => {
        return (
          <MResultForm
            key={`r${index}`}
            items={items}
            index={index}
            content={resultContent[index]}
            onChange={handleTextArea}
          />
        );
      })}
      <TwoButton
        leftButton={handleCancel}
        rightButton={handleSubmit}
        leftName={'취소'}
        rightName={'생성'}
      />
    </Container>
  );
};

export default ResultCard;
