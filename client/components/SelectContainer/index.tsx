import React from 'react';
import Wrapper from './styles';
import SelectInput from './SelectInput';
import SelectButton from './SelectButton';
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
  return (
    <Wrapper>
      <SelectInput
        onChange={onChange}
        index={index}
        data={data}
        isVisible={isVisible}
      />
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
