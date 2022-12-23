import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MAX_TYPE_ITEMS_COUNT, MIN_TYPE_ITEMS_COUNT } from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import TypeForm from '../../components/TypeForm/TypeForm';
import { Container, SetCounterButtonWrapper } from './TypeFormSection.style';
import { FormData } from '../StepForm/StepForm.type';

const TypeFormSection = () => {
  const { control } = useFormContext<FormData>();
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
      labelType: '유형',
      typeContent: '',
      labelExplanation: '설명',
      explanationContent: '',
    });
    setCount((count) => count + 1);
  };

  return (
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
      {fields.map(
        (
          { id, labelType, typeContent, labelExplanation, explanationContent },
          index,
        ) => {
          return (
            <TypeForm
              key={id}
              index={index}
              firstLabel={labelType}
              firstContent={typeContent}
              secondLabel={labelExplanation}
              secondContent={explanationContent}
            />
          );
        },
      )}
    </Container>
  );
};

export default TypeFormSection;
