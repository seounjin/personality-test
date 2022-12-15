import React from 'react';
import InputForm from '../../../../components/InputForm/InputForm';
import { SelectItems } from '../../container/SelectCard/SelectCard.type';
import { Label, Container } from './WriteForm.style';

const MInputForm = React.memo(InputForm);

interface WriteFormProps {
  item: SelectItems;
  selectIndex: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteForm = ({
  item,
  selectIndex,
  onChange,
}: WriteFormProps): JSX.Element => {
  const { type, question, label, optionItems } = item;
  return (
    <Container>
      <Label>{`${selectIndex + 1}번`}</Label>
      <MInputForm
        label={label}
        type={type}
        index={selectIndex}
        defaultValue={question}
        onChange={onChange}
      />
      {optionItems.map(({ label, type, option }, index) => (
        <MInputForm
          key={`i${index}`}
          label={label}
          type={type}
          index={selectIndex}
          optionIndex={index}
          defaultValue={option}
          onChange={onChange}
        />
      ))}
    </Container>
  );
};

export default WriteForm;
