import React from 'react';
import Wrapper from './styles';
import { Items } from '../type';

interface SelectInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  index: number;
  data: Items;
  isVisible: boolean;
}

const SelectInput = ({
  onChange,
  index,
  data,
  isVisible,
}: SelectInputProps): JSX.Element => {
  return (
    <Wrapper isVisible={isVisible}>
      <div className="select_wrapper">
        <label>{`${index + 1}번 질문`}</label>
        {isVisible === true ? (
          <input name="question" data-index={index} onChange={onChange} />
        ) : (
          <p>{data[`question`]}</p>
        )}
      </div>
      <div className="select_wrapper">
        <label>1번 선택</label>
        {isVisible === true ? (
          <input name="select_1" data-index={index} onChange={onChange} />
        ) : (
          <p>{data[`select_1`]}</p>
        )}
      </div>
      <div className="select_wrapper">
        <label>2번 선택</label>
        {isVisible === true ? (
          <input name="select_2" data-index={index} onChange={onChange} />
        ) : (
          <p>{data[`select_2`]}</p>
        )}
      </div>
    </Wrapper>
  );
};

// export default SelectInput;select_1 select_2
export default React.memo(SelectInput);
