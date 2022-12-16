import React from 'react';
import InputForm from '../../../../components/InputForm/InputForm';
import { SelectItems } from '../../container/SelectCard/SelectCard.type';
import CheckboxWithLabel from '../CheckboxWithLabel/CheckboxWithLabel';
import { TypeItems } from '../TypeForm/TypeForm.type';
import { SubTitle, Container, InputFormWrapper } from './WriteForm.style';

const MInputForm = React.memo(InputForm);

interface WriteFormProps {
  item: SelectItems;
  typeItems: TypeItems[];
  selectIndex: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WriteForm = ({
  item,
  typeItems,
  selectIndex,
  onChange,
}: WriteFormProps): JSX.Element => {
  const { type, question, label, optionItems } = item;
  return (
    <Container>
      <SubTitle>{`${selectIndex + 1}번`}</SubTitle>
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
          <CheckboxWithLabel items={typeItems} />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default WriteForm;
