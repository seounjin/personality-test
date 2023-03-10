import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import TextFiled from '../../../../components/TextFiled/TextField';
import {
  Form,
  Container,
  SubTitle,
} from '../SetSelectFormItems/SetSelectFormItems.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
import { setFinalMbtiSelctFormItems } from '../../../../store/modules/tests';
import { useDispatch } from 'react-redux';
import TextRadioButtonGroup from '../TextRadioButtonGroup/TextRadioButtonGroup';
import { MBTI_DATA } from '../../tests.const';
import { MbtiSelectFormItemsType } from './SetMbtiSelectFormItems.type';
import useStorage from '../../hooks/useStorage';

interface SetMbtiSelectFormItemsProps {
  handleNext: () => void;
}

const SetMbtiSelectFormItems = ({
  handleNext,
}: SetMbtiSelectFormItemsProps): JSX.Element => {
  const { mbtiSelectFormItems } = useSelector(
    (state: RootState) => ({
      mbtiSelectFormItems: state.tests.mbtiSelectFormItems,
    }),
    shallowEqual,
  );

  const { control, setValue, getValues, handleSubmit, trigger } =
    useFormContext<MbtiSelectFormItemsType>();

  const { fields } = useFieldArray({
    control,
    name: 'mbtiSelectFormItems',
  });

  const { setTestItems } = useStorage();
  useEffect(() => {
    if (!fields.length) {
      setValue('mbtiSelectFormItems', mbtiSelectFormItems);
    }
  }, []);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }

    const { mbtiSelectFormItems } = data;
    setTestItems({ selectItems: mbtiSelectFormItems });
    dispatch(setFinalMbtiSelctFormItems(data));
    handleNext();
  };

  return (
    <Form id="mbtiSelectForm" onSubmit={handleSubmit(onSubmit)}>
      <Container>
        {fields &&
          fields.map(
            (
              { id, optionItems, radioButtonItems, radioButtonIndex },
              numberOfItemsIndex,
            ) => {
              const firstType =
                MBTI_DATA[Math.floor(numberOfItemsIndex / 3)][0];
              const secondType =
                MBTI_DATA[Math.floor(numberOfItemsIndex / 3)][1];
              const subtitle = `${firstType}유형과 ${secondType}유형 판별`;
              return (
                <BoxShadowCard
                  key={id}
                  subtitle={`${numberOfItemsIndex + 1}번`}
                >
                  <SubTitle>{subtitle}</SubTitle>
                  <TextFiled
                    label={'질 문'}
                    name={`mbtiSelectFormItems[${numberOfItemsIndex}].question`}
                  />
                  {optionItems.map((_, optionItemIndex) => {
                    return (
                      <React.Fragment key={`t${optionItemIndex}]`}>
                        <TextFiled
                          label={`${optionItemIndex + 1}번 선택지`}
                          name={
                            `mbtiSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
                          }
                        />
                      </React.Fragment>
                    );
                  })}
                  <SubTitle>선택지 가중치 설정</SubTitle>
                  <TextRadioButtonGroup
                    numberOfItemsIndex={numberOfItemsIndex}
                    items={radioButtonItems}
                    radioButtonIndex={radioButtonIndex}
                    name={
                      `mbtiSelectFormItems[${numberOfItemsIndex}].radioButtonIndex` as const
                    }
                  />
                </BoxShadowCard>
              );
            },
          )}
      </Container>
    </Form>
  );
};

export default SetMbtiSelectFormItems;
