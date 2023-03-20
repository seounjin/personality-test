import React from 'react';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import TextFiled from '../../../../components/TextFiled/TextField';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import useStorage from '../../hooks/useStorage';
import SetWeightSection from '../SetWeightSection/SetWeightSection';
import {
  MAX_NUMBER_OF_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
  MIN_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  SCORE_TEST_SELECT_FORM_ID,
} from './ScoreTestTypeContainer.const';
import {
  setNumberOfItemsCount,
  setScoreTestSelectFormItems,
} from './ScoreTestTypeContainer.slice';
import {
  SetCounterButtonWrapper,
  SubTitle,
  TwoButtonWrapper,
} from './ScoreTestTypeContainer.style';
import { ScoreTestSelectFormItemsType } from './ScoreTestTypeContainer.type';

interface ScoreTestSelectFormProps {
  handleNext: () => void;
}

const ScoreTestSelectForm = ({
  handleNext,
}: ScoreTestSelectFormProps): JSX.Element => {
  const {
    mode,
    scoreTestSelectFormItems,
    scoreTestResultFormItems,
    numberOfItemsCount,
  } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      scoreTestResultFormItems: state.scoreTest.scoreTestResultFormItems,
      scoreTestSelectFormItems: state.scoreTest.scoreTestSelectFormItems,
      numberOfItemsCount: state.scoreTest.numberOfItemsCount,
    }),
    shallowEqual,
  );

  const { control, setValue, getValues, handleSubmit, trigger } =
    useFormContext<ScoreTestSelectFormItemsType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'scoreTestSelectFormItems',
  });

  const { setTestItems } = useStorage();

  const setWeightedScoreItems = () =>
    scoreTestResultFormItems.map(({ resultContent }) => ({
      resultContent: resultContent,
      score: 0,
    }));

  const beforeWeightedScoreItems = (item) => {
    return scoreTestResultFormItems.map(({ resultContent, score }, index) => ({
      resultContent: resultContent,
      score: 0,
    }));
  };
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
      setValue('scoreTestSelectFormItems', scoreTestSelectFormItems);
    } else {
      const res = setWeightedScoreItemsOfSelectFormItem();
      setValue('scoreTestSelectFormItems', res);
    }
  }, []);

  const dispatch = useDispatch();

  const decreaseNumberOfItems = () => {
    if (MIN_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    remove(numberOfItemsCount - 1);
    dispatch(setNumberOfItemsCount({ count: -1 }));
  };

  const increaseNumberOfItems = () => {
    if (MAX_NUMBER_OF_ITEMS_COUNT === numberOfItemsCount) return;
    append({
      question: '',
      optionItems: [
        ...new Array(2).fill(0).map(() => {
          return {
            option: '',
            weightedScoreItems: setWeightedScoreItems(),
          };
        }),
      ],
    });
    dispatch(setNumberOfItemsCount({ count: 1 }));
  };

  const getSelectFormItems = () => getValues('scoreTestSelectFormItems');

  const onSubmit = async (data) => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }
    const { scoreTestSelectFormItems } = data;
    if (mode === 'create') {
      setTestItems({ selectItems: scoreTestSelectFormItems });
    }
    dispatch(setScoreTestSelectFormItems(data));
    handleNext();
  };

  const increaseOptionItems = (numberOfItemsIndex) => {
    const selectItems = getSelectFormItems();
    const optionItemsCount = selectItems[numberOfItemsIndex].optionItems.length;

    if (MAX_OPTION_ITEMS_COUNT === optionItemsCount) return;

    const addOptionItems = selectItems.map((item, index) => {
      return numberOfItemsIndex === index
        ? {
            ...item,
            optionItems: [
              ...item.optionItems,
              {
                option: '',
                weightedScoreItems: setWeightedScoreItems(),
              },
            ],
          }
        : { ...item };
    });
    setValue('scoreTestSelectFormItems', addOptionItems);
  };

  const decreaeOptionItems = (numberOfItemsIndex) => {
    const selectItems = getSelectFormItems();
    const optionItemsCount = selectItems[numberOfItemsIndex].optionItems.length;
    if (MIN_OPTION_ITEMS_COUNT === optionItemsCount) return;

    const removeOptionItems = selectItems.map((item, index) => {
      return numberOfItemsIndex === index
        ? {
            ...item,
            optionItems: item.optionItems.slice(0, optionItemsCount - 1),
          }
        : { ...item };
    });

    setValue('scoreTestSelectFormItems', removeOptionItems);
  };

  return (
    <FormLayout
      id={SCORE_TEST_SELECT_FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SetCounterButtonWrapper>
        <SetCounterButton
          label={'문항수 설정'}
          count={numberOfItemsCount}
          onLeftButtonClick={decreaseNumberOfItems}
          onRightButtonClick={increaseNumberOfItems}
          minCount={MIN_NUMBER_OF_ITEMS_COUNT}
          maxCount={MAX_NUMBER_OF_ITEMS_COUNT}
        />
      </SetCounterButtonWrapper>

      {fields.map(({ id, optionItems }, numberOfItemsIndex) => {
        return (
          <BoxShadowCard key={id} subtitle={`${numberOfItemsIndex + 1}번`}>
            <TextFiled
              label={'질 문'}
              name={`scoreTestSelectFormItems[${numberOfItemsIndex}].question`}
            />
            {optionItems.map((_, optionItemIndex) => {
              return (
                <React.Fragment key={`t${optionItemIndex}]`}>
                  <TextFiled
                    label={`${optionItemIndex + 1}번 선택지`}
                    name={
                      `scoreTestSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
                    }
                  />
                  <SubTitle>유형별 가중치 설정</SubTitle>
                  <SetWeightSection
                    name={
                      `scoreTestSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].weightedScoreItems` as const
                    }
                  />
                </React.Fragment>
              );
            })}
            <TwoButtonWrapper>
              <TwoButton
                leftName="삭제"
                leftType="button"
                leftDisabled={MIN_OPTION_ITEMS_COUNT === optionItems.length}
                leftButton={() => decreaeOptionItems(numberOfItemsIndex)}
                rightName="추가"
                rightType="button"
                rightDisabled={MAX_OPTION_ITEMS_COUNT === optionItems.length}
                rightButton={() => increaseOptionItems(numberOfItemsIndex)}
              />
            </TwoButtonWrapper>
          </BoxShadowCard>
        );
      })}
    </FormLayout>
  );
};

export default ScoreTestSelectForm;
