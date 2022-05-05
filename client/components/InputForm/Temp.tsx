import React from 'react';

interface TempPropsType {
  label: string;
  input: string;
  num?: number;
  index: number;
  defaultValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Temp = ({
  label,
  input,
  defaultValue,
  index,
  num,
  handleChange,
}: TempPropsType): JSX.Element => {
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
};

export default React.memo(Temp);
