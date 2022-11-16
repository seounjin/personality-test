import React, { useCallback } from 'react';
import { Container, TwoButtonWrapper, FormContainer } from './SelectCard.style';
import ReadForm from '../../components/ReadForm/ReadForm';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import WriteForm from '../../components/WriteForm/WriteForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  handlerSelectInput,
  addSelectItem,
  approveSelectItem,
  transSelectItem,
  deleteSelectItem,
} from '../../../../store/modules/admin';

const MWriteForm = React.memo(WriteForm);
const MReadForm = React.memo(ReadForm);
const MTwoButton = React.memo(TwoButton);

const SelectCard = (): JSX.Element => {
  const dispatch = useDispatch();

  const { items, isResultScreen, isVisible } = useSelector(
    (state: RootState) => ({
      items: state.admin.items,
      isResultScreen: state.admin.isResultScreen,
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const handlechange = useCallback(
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

  const handleOk = (index: number): void => {
    const { question, select_1, select_2 } = items[index];
    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch(transSelectItem({ index }));
  };

  const handleDelete = useCallback((index: number): void => {
    dispatch(deleteSelectItem({ index }));
  }, []);

  const handleAdd = useCallback((): void => {
    dispatch(addSelectItem());
  }, []);

  const handleApprove = useCallback((): void => {
    const isCheck = isVisible.filter((data) => data === true);

    if (isCheck.length) {
      alert('선택지 작성에서 확인버튼을 눌러주세요!!!');
      return;
    }

    dispatch(approveSelectItem());
  }, []);

  return (
    <Container>
      {items.map((data, index) => {
        return (
          <FormContainer key={`s${index}`}>
            {isVisible[index] ? (
              <MWriteForm
                item={data}
                selectIndex={index}
                onChange={handlechange}
              />
            ) : (
              <MReadForm item={data} selectIndex={index} />
            )}

            {!isResultScreen && (
              <TwoButtonWrapper>
                <TwoButton
                  leftButton={() => handleOk(index)}
                  rightButton={() => handleDelete(index)}
                  leftName={isVisible[index] ? '확인' : '수정'}
                  rightName={'삭제'}
                />
              </TwoButtonWrapper>
            )}
          </FormContainer>
        );
      })}
      {!isResultScreen && (
        <MTwoButton
          leftButton={handleAdd}
          rightButton={handleApprove}
          leftName={'추가'}
          rightName={'완료'}
        />
      )}
    </Container>
  );
};

export default SelectCard;
