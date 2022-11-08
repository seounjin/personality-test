import React, { useCallback } from 'react';
import { Container, TwoButtonWrapper, FormContainer } from './SelectForm.style';
import ReadForm from '../ReadForm/ReadForm';
import TwoButton from '../TwoButton/TwoButton';
import WriteForm from '../WriteForm/WriteForm';
import _mapObject from '../../utils/_mapObject';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import {
  handlerSelectInput,
  addSelectItem,
  approveSelectItem,
  transSelectItem,
  deleteSelectItem,
} from '../../store/modules/admin';

const SelectForm = (): JSX.Element => {
  const dispatch = useDispatch();

  const { items, isResultScreen, isVisible } = useSelector(
    (state: RootState) => ({
      items: state.admin.items,
      isResultScreen: state.admin.isResultScreen,
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        value,
        name,
        dataset: { index },
      } = event.target;
      dispatch(handlerSelectInput({ name, value, index }));
    },
    [],
  );

  const handleAdd = useCallback((): void => {
    dispatch(addSelectItem());
  }, []);

  const handleApprove = (): void => {
    const isCheck = isVisible.filter((data) => data === true);

    if (isCheck.length) {
      alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
      return;
    }

    dispatch(approveSelectItem());
  };

  const pretreatment = (key, items, index) => ({
    label:
      key === 'question'
        ? `${index + 1}번질문`
        : key === 'select_1'
        ? '1번선택지'
        : '2번선택지',
    type: key,
    defaultValue: items[key],
  });

  const handleOk = (index: number): void => {
    const { question, select_1, select_2 } = items[index];
    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch(transSelectItem({ index }));
  };

  const handleDelete = (index: number): void => {
    dispatch(deleteSelectItem({ index }));
  };

  return (
    <Container>
      {items.map((data, selectIndex) => {
        const item = _mapObject(pretreatment, data, selectIndex);
        return (
          <FormContainer key={`s${selectIndex}`}>
            {isVisible[selectIndex] ? (
              <WriteForm
                item={item}
                selectIndex={selectIndex}
                onChange={onChange}
              />
            ) : (
              <ReadForm item={item} />
            )}

            {!isResultScreen && (
              <TwoButtonWrapper>
                <TwoButton
                  leftButton={() => handleOk(selectIndex)}
                  rightButton={() => handleDelete(selectIndex)}
                  leftName={isVisible[selectIndex] ? '확인' : '수정'}
                  rightName={'삭제'}
                />
              </TwoButtonWrapper>
            )}
          </FormContainer>
        );
      })}
      {!isResultScreen && (
        <TwoButton
          leftButton={handleAdd}
          rightButton={handleApprove}
          leftName={'추가'}
          rightName={'완료'}
        />
      )}
    </Container>
  );
};

export default SelectForm;
