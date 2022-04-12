import React from 'react';
import Wrapper from './styles';
import SelectInput from './SelectInput';
import SelectButton from './SelectButton';
import InputForm from '../InputForm';
import SelectForm from './SelectForm';
import _mapObject from '../../utils/_mapObject';
import { Items } from './type';

interface SelectProps {
  handleOk: (index: number) => void;
  handleDelete: (index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  data: Items;
  isVisible: boolean;
  isResultScreen: boolean;
}

const SelectContainer = ({
  handleOk,
  handleDelete,
  onChange,
  index,
  data,
  isVisible,
  isResultScreen,
}: SelectProps): JSX.Element => {
  const pretreatment = (key, items, index) => {
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
  };

  const item = _mapObject(pretreatment, data, index);

  return (
    <Wrapper>
      {isVisible === true ? (
        <InputForm handleChange={onChange} num={index} item={item}></InputForm>
      ) : (
        <SelectForm item={item}></SelectForm>
      )}

      {/* <SelectInput
        onChange={onChange}
        index={index}
        data={data}
        isVisible={isVisible}
      /> */}
      {!isResultScreen && (
        <SelectButton
          handleOk={handleOk}
          handleDelete={handleDelete}
          index={index}
          isVisible={isVisible}
        />
      )}
    </Wrapper>
  );
};

// export default SelectContainer;

export default React.memo(SelectContainer);
