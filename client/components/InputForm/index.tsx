import Wrapper from './styles';
import React from 'react';

interface TempPropsType {
  label: string;
  input: string;
  num?: number;
  index?: number;
  defaultValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({
  label,
  input,
  defaultValue,
  index,
  num,
  handleChange,
}: TempPropsType): JSX.Element => {
  return (
    <Wrapper>
      <label>{label}</label>
      <input
        type={input === 'password' ? 'password' : 'text'}
        name={input}
        data-index={num}
        onChange={handleChange}
        defaultValue={defaultValue}
      ></input>
    </Wrapper>
  );
};

export default React.memo(InputForm);
