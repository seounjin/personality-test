import React, { useCallback } from 'react';
import Wrapper from './styles';
import { Items } from '../type';
import InputForm from '../../InputForm/InputForm';
import SelectForm from '../SelectForm';
import SelectButton from '../SelectButton';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../../store/modules';

import {
  handlerSelectInput,
  transSelectItem,
  deleteSelectItem,
} from '../../../store/modules/admin';

interface SelectInputProps {
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputIndex: number;
  item: any;
}

const SelectInput = ({ inputIndex, item }: SelectInputProps): JSX.Element => {
  const dispatch = useDispatch();

  const { isResultScreen, isVisible } = useSelector(
    (state: RootState) => ({
      isResultScreen: state.admin.isResultScreen,
      isVisible: state.admin.isVisible,
    }),
    shallowEqual,
  );

  const handleOk = useCallback((index: number): void => {
    // console.log('확인', items[index]);
    // const { question, select_1, select_2 } = items[index];
    // if (!question || !select_1 || !select_2) {
    //   alert('선택지를 채워주세요');
    //   return;
    // }

    dispatch(transSelectItem({ index }));
  }, []);

  const handleDelete = useCallback((index: number): void => {
    dispatch(deleteSelectItem({ index }));
  }, []);

  const onChange = useCallback((event): void => {
    const {
      value,
      name,
      dataset: { index },
    } = event.target;

    dispatch(handlerSelectInput({ name, value, index }));
  }, []);

  return (
    <Wrapper>
      {isVisible[inputIndex] === true ? (
        item.map((data, index) => {
          const { label, type, defaultValue } = data;
          return (
            <InputForm
              key={label + index}
              label={label}
              type={type}
              index={inputIndex}
              defaultValue={defaultValue}
              onChange={onChange}
            ></InputForm>
          );
        })
      ) : (
        <SelectForm item={item}></SelectForm>
      )}

      {!isResultScreen && (
        <SelectButton
          handleOk={handleOk}
          handleDelete={handleDelete}
          index={inputIndex}
          isVisible={isVisible}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(SelectInput);
