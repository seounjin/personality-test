import React, { useCallback } from 'react';
import Wrapper from './styles';
import ResultContent from './ResultContent';
import TwoButton from '../TwoButton/TwoButton';
import { ResultItems } from '../SelectContainer/type';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setResultContent, excuteResultItem } from '../../store/modules/admin';
import { RootState } from '../../store/modules';
import { useRouter } from 'next/router';
import fetcher from '../../api/fetcher';

interface ResultContainerProps {
  ImgFile: File;
}

const ResultContainer = ({ ImgFile }: ResultContainerProps): JSX.Element => {
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

  const handleExcute = useCallback((): void => {
    dispatch(excuteResultItem());
  }, []);

  const handleSubmit = async (): Promise<void> => {
    // 유효성 검사
    if (
      !userItem[0].defaultValue ||
      !userItem[1].defaultValue ||
      !userItem[2].defaultValue
    ) {
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

    if (!ImgFile) {
      alert('이미지를 올려주세요');
      return;
    }

    // formdata 생성
    const formData: FormData = new FormData();

    const { id } = router.query;

    if (id) {
      formData.append(
        'test',
        JSON.stringify({ title: userItem[0].defaultValue }),
      );
    } else {
      formData.append(
        'user',
        JSON.stringify({
          title: userItem[0].defaultValue,
          id: userItem[1].defaultValue,
          password: userItem[2].defaultValue,
        }),
      );
    }

    formData.append('results', JSON.stringify(resultContent));
    formData.append('file', ImgFile);

    const selectItems = items.map((data, index) => {
      return { ...data, select_1_id: index * 2, select_2_id: index * 2 + 1 };
    });
    formData.append('items', JSON.stringify(selectItems));

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
  };

  return (
    <Wrapper>
      {resultItems.map((data, index) => {
        return (
          <ResultContent
            key={'resultItems' + index.toString()}
            item={data[0] as unknown as ResultItems[]}
            index={index}
            resultContent={resultContent[index]}
            handleTextArea={handleTextArea}
          ></ResultContent>
        );
      })}

      <TwoButton
        leftButton={handleExcute}
        rightButton={handleSubmit}
        leftName={'취소'}
        rightName={'생성'}
      />
    </Wrapper>
  );
};

export default ResultContainer;
