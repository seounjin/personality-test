import React from 'react';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import TextFiled from '../../../../components/TextFiled/TextField';
import BoxShadowCard from '../../../../layout/BoxShadowCard/BoxShadowCard';
import FormLayout from '../../../../layout/FormLayout/FormLayout';
import { RootState } from '../../../../store/modules';
import useStorage from '../../hooks/useStorage';
import { SubTitle } from '../../tests.styles';
import TextRadioButtonGroup from '../TextRadioButtonGroup/TextRadioButtonGroup';
import { MBTI_DATA, MBTI_TEST_SELECT_FORM_ID } from './mbtiTestType.const';
import { setMbtiSelctFormItems } from './mbtiTestType.slice';
import { MbtiTestSelectFormItemsType } from './mbtiTestType.type';
import { cloneDeep } from 'lodash';

interface MbtiTestSelectFormProps {
  handleNext: () => void;
}

const MbtiTestSelectForm = ({
  handleNext,
}: MbtiTestSelectFormProps): JSX.Element => {
  const { mode, mbtiTestSelectFormItems } = useSelector(
    (state: RootState) => ({
      mode: state.tests.mode,
      mbtiTestSelectFormItems: state.mbtiTest.mbtiTestSelectFormItems,
    }),
    shallowEqual,
  );

  const { control, setValue, handleSubmit, trigger } =
    useFormContext<MbtiTestSelectFormItemsType>();

  const { fields } = useFieldArray({
    control,
    name: 'mbtiTestSelectFormItems',
  });

  const { setTestItems } = useStorage();
  useEffect(() => {
    if (!fields.length) {
      setValue('mbtiTestSelectFormItems', mbtiTestSelectFormItems);
    }
  }, []);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const isStepValid = await trigger();

    if (!isStepValid) {
      alert('빈칸을 확인해 주세요');
      return;
    }
    const { mbtiTestSelectFormItems } = data;
    if (mode === 'create') {
      setTestItems({ mbtiTestSelectFormItems: mbtiTestSelectFormItems });
    }
    dispatch(setMbtiSelctFormItems(cloneDeep(data)));
    handleNext();
  };

  return (
    <FormLayout id={MBTI_TEST_SELECT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
      {fields &&
        fields.map(
          (
            { id, optionItems, radioButtonItems, radioButtonIndex },
            numberOfItemsIndex,
          ) => {
            const firstType = MBTI_DATA[Math.floor(numberOfItemsIndex / 3)][0];
            const secondType = MBTI_DATA[Math.floor(numberOfItemsIndex / 3)][1];
            const subtitle = `${firstType}유형과 ${secondType}유형 판별`;
            return (
              <BoxShadowCard key={id} subtitle={`${numberOfItemsIndex + 1}번`}>
                <SubTitle>{subtitle}</SubTitle>
                <TextFiled
                  label={'질 문'}
                  name={`mbtiTestSelectFormItems[${numberOfItemsIndex}].question`}
                />
                {optionItems.map((_, optionItemIndex) => {
                  return (
                    <React.Fragment key={`t${optionItemIndex}]`}>
                      <TextFiled
                        label={`${optionItemIndex + 1}번 선택지`}
                        name={
                          `mbtiTestSelectFormItems[${numberOfItemsIndex}].optionItems[${optionItemIndex}].option` as const
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
                    `mbtiTestSelectFormItems[${numberOfItemsIndex}].radioButtonIndex` as const
                  }
                />
              </BoxShadowCard>
            );
          },
        )}
    </FormLayout>
  );
};

export default MbtiTestSelectForm;
