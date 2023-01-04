import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import BoxShadowCard from '../BoxShadowCard/BoxShadowCard';
import TextFiled from '../../components/TextFiled/TextField';
import {
  Form,
  Container,
  SetCounterButtonWrapper,
  SubTitle,
} from './SetSelectFormItems.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { SelectFormValues } from './SetSelectFormItems.type';
import SetWeightSection from '../SetWeightSection/SetWeightSection';

interface SetSelectItemsFormProps {
  handleNext: () => void;
}

const SetSelectFormItems = ({
  handleNext,
}: SetSelectItemsFormProps): JSX.Element => {
  const { selectFormItems, typeFormItems } = useSelector(
    (state: RootState) => ({
      typeFormItems: state.admin.typeFormItems,
      selectFormItems: state.admin.selectFormItems,
    }),
    shallowEqual,
  );

  const { control, setValue, getValues, handleSubmit, trigger } =
    useFormContext<SelectFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'selectFormItems',
  });

  const setWeightedScoreItems = () =>
    typeFormItems.map(({ typeContent }) => ({
      type: typeContent,
      score: 0,
    }));

  const beforeWeightedScoreItems = (item) =>
    typeFormItems.map(({ typeContent }, index) => ({
      type: typeContent,
      score: item[index].score ? item[index].score : 0,
    }));

  const setWeightedScoreItemsOfSelectFormItem = () =>
    fields.map((item) => ({
      ...item,
      optionItems: item.optionItems.map((optionItem) => ({
        ...optionItem,
        weightedScoreItems: beforeWeightedScoreItems(
          optionItem.weightedScoreItems,
        ),
      })),
    }));

  useEffect(() => {
    if (!fields.length) {
      setValue('selectFormItems', selectFormItems);
    } else {
      const res = setWeightedScoreItemsOfSelectFormItem();
      setValue('selectFormItems', res);
    }
  }, []);

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
      optionItems: [
        ...new Array(optionItemsCount).fill(0).map(() => {
          return {
            option: '',
            weightedScoreItems: setWeightedScoreItems(),
          };
        }),
      ],
    });
    setNumberOfItemsCount((numberOfItemsCount) => numberOfItemsCount + 1);
  };

  const decreaeOptionItemsCount = () => {
    if (MIN_OPTION_ITEMS_COUNT === optionItemsCount) return;
    const selectItems = getValues('selectFormItems');

    const removeOptionItems = selectItems.map((data) => {
      return {
        ...data,
        optionItems: data.optionItems.slice(0, optionItemsCount - 1),
      };
    });

    setValue('selectFormItems', removeOptionItems);
    setOptionItemsCount((optionItemsCount) => optionItemsCount - 1);
  };

  const increaseOptionItemsCount = () => {
    if (MAX_OPTION_ITEMS_COUNT === optionItemsCount) return;

    const selectItems = getValues('selectFormItems');

    const addOptionItems = selectItems.map((item) => {
      return {
        ...item,
        optionItems: [
          ...item.optionItems,
          {
            option: '',
            weightedScoreItems: setWeightedScoreItems(),
          },
        ],
      };
    });
    setValue('selectFormItems', addOptionItems);

    setOptionItemsCount((optionItemsCount) => optionItemsCount + 1);
  };

  const onSubmit = async () => {
    const isStepValid = await trigger();
    console.log('isStepValid', isStepValid);
    if (!isStepValid) return;

    handleNext();
  };

  return (
    <Form id="selectForm" onSubmit={handleSubmit(onSubmit)}>
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
                name={`selectFormItems[${numberOfItemsIndex}].question`}
              />
              {optionItems.map((_, optionItemIndex) => {
                return (
                  <React.Fragment key={`t${optionItemIndex}]`}>
                    <TextFiled
                      label={`${optionItemIndex + 1}번 선택지`}
                      name={
                        `selectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
                      }
                    />
                    <SubTitle>유형별 가중치 설정</SubTitle>
                    <SetWeightSection
                      name={
                        `selectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].weightedScoreItems` as const
                      }
                    />
                  </React.Fragment>
                );
              })}
            </BoxShadowCard>
          );
        })}
      </Container>
    </Form>
  );
};

export default SetSelectFormItems;
