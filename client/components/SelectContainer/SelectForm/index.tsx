import React from 'react';
import Wrapper from './styles';

interface Item {
  label: string;
  input: string;
  defaultValue: string;
}

interface SelectFormProps {
  item: Item[];
}

const SelectForm = ({ item }: SelectFormProps): JSX.Element => {
  return (
    <Wrapper>
      {item.map((data, index) => {
        const { label, defaultValue } = data;
        return (
          <div key={label + index} className="selectform_container">
            <div className="selectform_title">
              <label>{label}</label>
            </div>

            <div className="selectform_content">
              <p>{defaultValue}</p>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default React.memo(SelectForm);
