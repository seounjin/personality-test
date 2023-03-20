import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector, shallowEqual } from 'react-redux';
import TextFiled from '../../../../components/TextFiled/TextField';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import { RootState } from '../../../../store/modules';
import {
  setNumberOfItemsCount,
  setTrueOrFalseResultFormItems,
  setTrueOrFalseSelectFormItems,
} from '../../../../store/modules/tests';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import {
  TF_MIN_NUMBER_OF_ITEMS_COUNT,
  TF_MAX_NUMBER_OF_ITEMS_COUNT,
} from '../../tests.const';
import {
  Form,
  SetCounterButtonWrapper,
} from '../SetSelectFormItems/SetSelectFormItems.style';
import { TrueOrFalseSelectFormValues } from './SetTureOrFalseSelectFormItems.type';
import { cloneDeep } from 'lodash';
import { createTrueOrFalseResultFormItems } from '../../tests.util';

interface SetTureOrFalseSelectFormItemsProps {
  handleNext: () => void;
}

const SetTureOrFalseSelectFormItems = ({
  handleNext,
}: SetTureOrFalseSelectFormItemsProps): JSX.Element => {
  const { mode, numberOfItemsCount, trueOrFalseResultFormItems } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      numberOfItemsCount: state.tests.numberOfItemsCount,
      trueOrFalseResultFormItems: state.tests.trueOrFalseResultFormItems,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const { control, setValue, getValues, handleSubmit, trigger } =
    useFormContext<TrueOrFalseSelectFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'trueOrFalseSelectFormItems',
  });

  const decreaseNumberOfItems = () => {
    if (TF_MIN_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    remove(numberOfItemsCount - 1);
    dispatch(setNumberOfItemsCount({ count: -1 }));
  };

  const increaseNumberOfItems = () => {
    if (TF_MAX_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    append({
      question: '',
      optionItems: [
        ...new Array(2).fill(0).map((_, index) => {
          return {
            id: `${numberOfItemsCount * 2 + index}`,
            option: '',
          };
        }),
      ],
    });
    dispatch(setNumberOfItemsCount({ count: 1 }));
  };

  const onSubmit = async (data) => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }
    const { trueOrFalseSelectFormItems } = data;

    dispatch(setTrueOrFalseSelectFormItems(cloneDeep(data)));

    // const res = createTrueOrFalseResultFormItems(
    //   trueOrFalseSelectFormItems,
    //   trueOrFalseResultFormItems,
    // );

    // dispatch(
    //   setTrueOrFalseResultFormItems({ trueOrFalseResultFormItems: res }),
    // );

    handleNext();
  };

  return (
    <Form id="trueOrFalseSelectForm" onSubmit={handleSubmit(onSubmit)}>
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'문항수 설정'}
          count={numberOfItemsCount}
          onLeftButtonClick={decreaseNumberOfItems}
          onRightButtonClick={increaseNumberOfItems}
          minCount={TF_MIN_NUMBER_OF_ITEMS_COUNT}
          maxCount={TF_MAX_NUMBER_OF_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>

      {fields.map(({ id, optionItems }, numberOfItemsIndex) => {
        return (
          <BoxShadowCard key={id} subtitle={`${numberOfItemsIndex + 1}번`}>
            <TextFiled
              label={'질 문'}
              name={`trueOrFalseSelectFormItems[${numberOfItemsIndex}].question`}
            />
            {optionItems.map((_, optionItemIndex) => {
              return (
                <React.Fragment key={`t${optionItemIndex}]`}>
                  <TextFiled
                    label={`${optionItemIndex + 1}번 선택지`}
                    name={
                      `trueOrFalseSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
                    }
                  />
                </React.Fragment>
              );
            })}
          </BoxShadowCard>
        );
      })}
    </Form>
  );
};

export default SetTureOrFalseSelectFormItems;
