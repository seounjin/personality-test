import React, { useCallback } from 'react';
import { Wrapper, TwoButtonWrapper } from './styles';
import InputForm from '../InputForm/InputForm';
import SelectForm from './SelectForm/SelectForm';
import TwoButton from '../TwoButton/TwoButton';
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

const SelectContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const { items, isResultScreen, isVisible } = useSelector(
    (state: RootState) => ({
      items: state.admin.items,
      isResultScreen: state.admin.isResultScreen,
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const onChange = useCallback((event): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;
    dispatch(handlerSelectInput({ name, value, index }));
  }, []);

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

  const pretreatment = useCallback((key, items, index) => {
    return {
      label:
        key === 'question'
          ? `${index + 1}번질문`
          : key === 'select_1'
          ? '1번선택지'
          : '2번선택지',
      input: key,
      defaultValue: items[key],
    };
  }, []);

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
    <Wrapper>
      {items.map((data, selectIndex) => {
        const item = _mapObject(pretreatment, data, selectIndex);
        return (
          <div key={`s${selectIndex}`}>
            {isVisible[selectIndex] === true ? (
              item.map((data, index) => {
                const { label, type, defaultValue } = data;
                return (
                  <InputForm
                    key={`i${index}`}
                    label={label}
                    type={type}
                    index={selectIndex}
                    defaultValue={defaultValue}
                    onChange={onChange}
                  />
                );
              })
            ) : (
              <SelectForm item={item} />
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
          </div>
        );
      })}
      {isResultScreen === false && (
        <TwoButton
          leftButton={handleAdd}
          rightButton={handleApprove}
          leftName={'추가'}
          rightName={'완료'}
        />
      )}
    </Wrapper>
  );
};

export default SelectContainer;
