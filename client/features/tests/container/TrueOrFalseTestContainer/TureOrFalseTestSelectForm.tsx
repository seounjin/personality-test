import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/modules';
import {
  TF_MAX_NUMBER_OF_ITEMS_COUNT,
  TF_MIN_NUMBER_OF_ITEMS_COUNT,
  TF_TEST_SELECT_FORM_ID,
} from './trueOrFalse.const';
import {
  setNumberOfItemsCount,
  setTrueOrFalseTestSelectFormItems,
} from './trueOrFalse.slice';
import { TrueOrFalseTestSelectFormValues } from './trueOrFalseTest.type';
import { cloneDeep } from 'lodash';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import React from 'react';
import TextFiled from '../../../../components/TextFiled/TextField';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import { SetCounterButtonWrapper } from '../../tests.styles';
import useStorage from '../../hooks/useStorage';

interface TureOrFalseSelectFormProps {
  handleNext: () => void;
}

const TureOrFalseTestSelectForm = ({
  handleNext,
}: TureOrFalseSelectFormProps): JSX.Element => {
  const { mode, numberOfItemsCount } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      numberOfItemsCount: state.trueOrFalseTest.numberOfItemsCount,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const { control, handleSubmit, trigger } =
    useFormContext<TrueOrFalseTestSelectFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'trueOrFalseTestSelectFormItems',
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

  const { setTestItems } = useStorage();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }
    const { trueOrFalseTestSelectFormItems } = data;

    if (mode === 'create') {
      setTestItems({
        selectItems: trueOrFalseTestSelectFormItems,
      });
    }

    dispatch(setTrueOrFalseTestSelectFormItems(cloneDeep(data)));

    handleNext();
  };

  return (
    <FormLayout id={TF_TEST_SELECT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
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
              name={`trueOrFalseTestSelectFormItems[${numberOfItemsIndex}].question`}
            />
            {optionItems.map((_, optionItemIndex) => {
              return (
                <React.Fragment key={`t${optionItemIndex}]`}>
                  <TextFiled
                    label={`${optionItemIndex + 1}번 선택지`}
                    name={
                      `trueOrFalseTestSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
                    }
                  />
                </React.Fragment>
              );
            })}
          </BoxShadowCard>
        );
      })}
    </FormLayout>
  );
};

export default TureOrFalseTestSelectForm;
