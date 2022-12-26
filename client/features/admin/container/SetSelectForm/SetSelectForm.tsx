import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import WeightedBoard from '../../components/WeightedBoard/WeightedBoard';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';
import {
  Container,
  SetCounterButtonWrapper,
  SubTitle,
} from './SetSelectForm.style';
import { FormData } from '../StepForm/StepForm.type';
import TextFiled from '../../components/TextFiled/TextField';
import CheckboxWithLabel from '../../components/CheckboxWithLabel/CheckboxWithLabel';

const SetSelectForm = (): JSX.Element => {
  const { control, setValue, getValues } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'selectItems',
  });

  const [numberOfItemsCount, setNumberOfItemsCount] = useState(
    MIN_NUMBER_OF_ITEMS_COUNT,
  );
  const [optionItemsCount, setOptionItemsCount] = useState(
    MIN_OPTION_ITEMS_COUNT,
  );

  const decreaseNumberOfItems = () => {
    if (MIN_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    remove(numberOfItemsCount - 1);
    setNumberOfItemsCount((numberOfItemsCount) => numberOfItemsCount - 1);
  };

  const inCreaseNumberOfItems = () => {
    if (MAX_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    append({
      question: '',
      weightCheckboxes: [],
      optionItems: [
        ...new Array(optionItemsCount).fill(0).map(() => {
          return {
            option: '',
          };
        }),
      ],
    });
    setNumberOfItemsCount((numberOfItemsCount) => numberOfItemsCount + 1);
  };

  const decreaeOptionItemsCount = () => {
    if (MIN_OPTION_ITEMS_COUNT === optionItemsCount) return;
    const selectItems = getValues('selectItems');

    const removeOptionItems = selectItems.map((data) => {
      return {
        ...data,
        optionItems: data.optionItems.slice(0, optionItemsCount - 1),
      };
    });

    setValue('selectItems', removeOptionItems);
    setOptionItemsCount((optionItemsCount) => optionItemsCount - 1);
  };

  const increaseOptionItemsCount = () => {
    if (MAX_OPTION_ITEMS_COUNT === optionItemsCount) return;

    const selectItems = getValues('selectItems');

    const addOptionItems = selectItems.map((data) => {
      return { ...data, optionItems: [...data.optionItems, { option: '' }] };
    });
    setValue('selectItems', addOptionItems);

    setOptionItemsCount((optionItemsCount) => optionItemsCount + 1);
  };

  return (
    <Container>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'문항수 설정'}
          count={numberOfItemsCount}
          onLeftButtonClick={decreaseNumberOfItems}
          onRightButtonClick={inCreaseNumberOfItems}
          minCount={MIN_NUMBER_OF_ITEMS_COUNT}
          maxCount={MAX_NUMBER_OF_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>

      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'선택지 수 설정'}
          count={optionItemsCount}
          onLeftButtonClick={decreaeOptionItemsCount}
          onRightButtonClick={increaseOptionItemsCount}
          minCount={MIN_OPTION_ITEMS_COUNT}
          maxCount={MAX_OPTION_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>

      {fields.map(({ id, optionItems }, numberOfItemsIndex) => {
        return (
          <BoxShadowCard key={id} subtitle={`${numberOfItemsIndex + 1}번`}>
            <TextFiled
              label={'질 문'}
              name={`selectItems[${numberOfItemsIndex}].question`}
            />
            {optionItems.map((_, optionItemIndex) => {
              return (
                <TextFiled
                  key={`n${optionItemIndex}`}
                  label={`${optionItemIndex + 1}번 선택지`}
                  name={`selectItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option`}
                />
              );
            })}

            <SubTitle>가중치 설정</SubTitle>
            <CheckboxWithLabel
              items={getValues('typeFormItems')}
              name={`selectItems[${numberOfItemsIndex}].weightCheckboxes`}
            />
          </BoxShadowCard>
        );
      })}

      <BoxShadowCard subtitle={'가중치'}>
        <WeightedBoard
          items={getValues('typeFormItems').map(
            ({ typeContent }) => typeContent,
          )}
        />
      </BoxShadowCard>
    </Container>
  );
};

export default SetSelectForm;
