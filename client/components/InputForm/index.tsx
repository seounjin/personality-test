import Wrapper from './styles';
import React from 'react';

interface Item {
  label: string;
  input: string;
  defaultValue: string;
}

interface InputFormProps {
  item: Item[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = ({ item, handleChange }: InputFormProps): JSX.Element => {
  return (
    <Wrapper>
      {item.map((data, index) => {
        const { label, input, defaultValue } = data;
        return (
          <div key={'userForm' + index} className="userform_container">
            <label>{label}</label>
            <input
              id={input}
              name={input}
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
