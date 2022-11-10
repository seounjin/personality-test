import React from 'react';
import useParseItem from '../../hooks/useParseItem';
import InputForm from '../InputForm/InputForm';
import { SelectItem } from '../SelectCard/SelectCard.type';

const MInputForm = React.memo(InputForm);

interface WriteFormProps {
  item: SelectItem[];
  selectIndex: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteForm = ({
  item,
  selectIndex,
  onChange,
}: WriteFormProps): JSX.Element => {
  const writeItem = useParseItem({ item, index: selectIndex });
  return (
    <>
      {writeItem.map(({ label, type, defaultValue }, index) => (
        <MInputForm
          key={`i${index}`}
          label={label}
          type={type}
          index={selectIndex}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export default WriteForm;
