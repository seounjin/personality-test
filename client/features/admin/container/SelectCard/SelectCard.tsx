import React, { useCallback } from 'react';
import { Container, TwoButtonWrapper, FormContainer } from './SelectCard.style';
import ReadForm from '../../components/ReadForm/ReadForm';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import WriteForm from '../../components/WriteForm/WriteForm';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  setSelectItemVisble,
  deleteSelectItem,
  handlerSelectInput,
} from '../../../../store/modules/admin';

const MWriteForm = React.memo(WriteForm);
const MReadForm = React.memo(ReadForm);

const SelectCard = (): JSX.Element => {
  const dispatch = useDispatch();

  const { selectItems, isResultScreen, selectItemsVisible } = useSelector(
    (state: RootState) => ({
      selectItems: state.admin.selectItems,
      isResultScreen: state.admin.isResultScreen,
      selectItemsVisible: state.admin.selectItemsVisible,
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
    const { question, select_1, select_2 } = selectItems[index];
    if (!question || !select_1 || !select_2) {
      alert('선택지를 채워주세요');
      return;
    }

    dispatch(setSelectItemVisble({ index }));
  };

  const handleDelete = useCallback((index: number): void => {
    dispatch(deleteSelectItem({ index }));
  }, []);

  return (
    <Container>
      {selectItems.map((data, index) => {
        return (
          <FormContainer key={`s${index}`}>
            {!selectItemsVisible[index] ? (
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
                  leftName={!selectItemsVisible[index] ? '확인' : '수정'}
                  rightName={'삭제'}
                />
              </TwoButtonWrapper>
            )}
          </FormContainer>
        );
      })}
    </Container>
  );
};

export default SelectCard;
