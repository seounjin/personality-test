import React from 'react';
import InputForm from '../../../../components/InputForm/InputForm';
import { SelectItems } from '../SelectCard/SelectCard.type';
import CheckboxWithLabel from '../../components/CheckboxWithLabel/CheckboxWithLabel';
import { TypeItems } from '../../components/TypeForm/TypeForm.type';
import { SubTitle, InputFormWrapper } from './WriteForm.style';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';

const MInputForm = React.memo(InputForm);

interface WriteFormProps {
  item: SelectItems;
  typeItems: TypeItems[];
  selectIndex: number;
  handleCheckbox: (event: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteForm = ({
  item,
  typeItems,
  selectIndex,
  onChange,
  handleCheckbox,
}: WriteFormProps): JSX.Element => {
  const { type, question, label, optionItems } = item;
  return (
    <BoxShadowCard subtitle={`${selectIndex + 1}번`}>
      <MInputForm
        label={label}
        type={type}
        index={selectIndex}
        defaultValue={question}
        onChange={onChange}
      />
      {optionItems.map(({ label, type, option }, index) => (
        <React.Fragment key={`i${index}`}>
          <InputFormWrapper>
            <MInputForm
              label={label}
              type={type}
              index={selectIndex}
              optionIndex={index}
              defaultValue={option}
              onChange={onChange}
            />
          </InputFormWrapper>
          <SubTitle>가중치 설정</SubTitle>
          <CheckboxWithLabel items={typeItems} onCheckbox={handleCheckbox} />
        </React.Fragment>
      ))}
    </BoxShadowCard>
  );
};

export default WriteForm;
