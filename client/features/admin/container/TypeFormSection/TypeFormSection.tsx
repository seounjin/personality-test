import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import TypeForm from '../../components/TypeForm/TypeForm';
import {
  Form,
  Container,
  SetCounterButtonWrapper,
} from './TypeFormSection.style';
import {
  setSelctFormItems,
  setTypeFormItems,
  setTypeDictionary,
} from '../../../../store/modules/admin';
import { useDispatch } from 'react-redux';
import { TypeItemValues } from '../../components/TypeForm/TypeForm.type';

interface TypeFormSectionProps {
  handleNext: () => void;
}

const TypeFormSection = ({ handleNext }: TypeFormSectionProps): JSX.Element => {
  const { control, trigger, handleSubmit } = useFormContext<TypeItemValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'typeFormItems',
  });

  const [count, setCount] = useState<number>(MIN_TYPE_ITEMS_COUNT);

  const handleDecrease = () => {
    if (MIN_TYPE_ITEMS_COUNT === count) return;
    remove(count - 1);
    setCount((count) => count - 1);
  };

  const handleIncrease = () => {
    if (MAX_TYPE_ITEMS_COUNT === count) return;
    append({
      typeContent: '',
      explanationContent: '',
    });
    setCount((count) => count + 1);
  };

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();
    if (!isStepValid) return;
    const { typeFormItems } = data;
    dispatch(setTypeFormItems({ typeFormItems: [...typeFormItems] }));
    dispatch(setSelctFormItems({ typeFormItems: [...typeFormItems] }));
    dispatch(setTypeDictionary({ typeFormItems: [...typeFormItems] }));
    handleNext();
  };

  const onError = (errors, e) => {
    e.preventDefault();
    alert(errors.typeFormItems.message);
  };

  return (
    <Form id="typeForm" onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <SetCounterButtonWrapper>
          <SetCounterButton
            label={'유형 수 설정'}
            count={count}
            onLeftButtonClick={handleDecrease}
            onRightButtonClick={handleIncrease}
            minCount={MIN_TYPE_ITEMS_COUNT}
            maxCount={MAX_TYPE_ITEMS_COUNT}
          />
        </SetCounterButtonWrapper>
        {fields.map(({ id, typeContent, explanationContent }, index) => (
          <TypeForm
            key={id}
            index={index}
            firstLabel={'유 형'}
            firstContent={typeContent}
            secondLabel={'설 명'}
            secondContent={explanationContent}
          />
        ))}
      </Container>
    </Form>
  );
};

export default TypeFormSection;
