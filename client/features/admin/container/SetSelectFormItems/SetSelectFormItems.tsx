import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  MIN_NUMBER_OF_ITEMS_COUNT,
  MAX_NUMBER_OF_ITEMS_COUNT,
  MIN_OPTION_ITEMS_COUNT,
  MAX_OPTION_ITEMS_COUNT,
} from '../../admin.const';
import SetCounterButton from '../../components/SetCounterButton/SetCounterButton';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import TextFiled from '../../../../components/TextFiled/TextField';
import {
  Form,
  Container,
  SetCounterButtonWrapper,
  SubTitle,
  TwoButtonWrapper,
} from './SetSelectFormItems.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { SelectFormValues } from './SetSelectFormItems.type';
import SetWeightSection from '../SetWeightSection/SetWeightSection';
import {
  setNumberOfItemsCount,
  setSelectFormItems,
} from '../../../../store/modules/admin';
import { useDispatch } from 'react-redux';
import TwoButton from '../../../../components/TwoButton/TwoButton';

interface SetSelectItemsFormProps {
  handleNext: () => void;
}

const SetSelectFormItems = ({
  handleNext,
}: SetSelectItemsFormProps): JSX.Element => {
  const { selectFormItems, typeFormItems, numberOfItemsCount } = useSelector(
    (state: RootState) => ({
      typeFormItems: state.admin.typeFormItems,
      selectFormItems: state.admin.selectFormItems,
      numberOfItemsCount: state.admin.numberOfItemsCount,
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
      typeContent: typeContent,
      score: 0,
    }));

  const beforeWeightedScoreItems = (item) =>
    typeFormItems.map(({ typeContent }, index) => ({
      typeContent: typeContent,
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

  const getSelectFormItems = () => getValues('selectFormItems');

  const onSubmit = async () => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }
    dispatch(
      setSelectFormItems({
        selectFormItems: [...getValues('selectFormItems')],
      }),
    );
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
    setValue('selectFormItems', addOptionItems);
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

    setValue('selectFormItems', removeOptionItems);
  };

  return (
    <Form id="selectForm" onSubmit={handleSubmit(onSubmit)}>
      <Container>
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
      </Container>
    </Form>
  );
};

export default SetSelectFormItems;
