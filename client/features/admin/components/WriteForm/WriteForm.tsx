import React from 'react';
import InputForm from '../../../../components/InputForm/InputForm';
import { useParseItem } from '../../admin.hook';
import { SelectItem } from '../../container/SelectCard/SelectCard.type';
import { Label, Container } from './WriteForm.style';

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
    <Container>
      <Label>{`${selectIndex + 1}번`}</Label>
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
    </Container>
  );
};

export default WriteForm;
