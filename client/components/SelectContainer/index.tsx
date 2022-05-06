import React, { useCallback } from 'react';
import Wrapper from './styles';
import SelectButton from './SelectButton';
import InputForm from '../InputForm';
import SelectForm from './SelectForm';
import AdminButton from '../AdminButton';
import _mapObject from '../../utils/_mapObject';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import {
  handlerSelectInput,
  addSelectItem,
  approveSelectItem,
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

  return (
    <Wrapper>
      {items.map((data, selectIndex) => {
        const item = _mapObject(pretreatment, data, selectIndex);
        return (
          <div key={'selectItem' + `${selectIndex}`}>
            {isVisible[selectIndex] === true ? (
              item.map((data, index) => {
                const { label, input, defaultValue } = data;
                return (
                  <InputForm
                    key={label + index}
                    label={label}
                    input={input}
                    num={selectIndex}
                    defaultValue={defaultValue}
                    index={index}
                    handleChange={onChange}
                  ></InputForm>
                );
              })
            ) : (
              <SelectForm item={item}></SelectForm>
            )}

            {!isResultScreen && (
              <SelectButton index={selectIndex}></SelectButton>
            )}
          </div>
        );
      })}
      {isResultScreen === false && (
        <AdminButton
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
