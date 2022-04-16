import Wrapper from './styles';
import React from 'react';

interface Item {
  label: string;
  input: string;
  defaultValue: string;
}

interface InputFormProps {
  item: Item[];
  num?: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({
  item,
  num,
  handleChange,
}: InputFormProps): JSX.Element => {
  return (
    <Wrapper>
      {item.map((data, index) => {
        const { label, input, defaultValue } = data;
        return (
          <div key={label + index} className="inputform_container">
            <label>{label}</label>
            <input
              type={input === 'password' ? 'password' : 'text'}
              name={input}
              data-index={num}
              onChange={handleChange}
              defaultValue={defaultValue}
            ></input>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default React.memo(InputForm);
