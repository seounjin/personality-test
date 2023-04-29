import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  DynamicTureOrFalseTestSelectForm,
  DynamicTrueOrFalseTestResultForm,
  DynamicTrueOrFalseTestFinalForm,
} from '.';
import { useTrueOrFalseTestFormMethods } from '../../hooks/useTrueOrFalseTestFormMethods';
import {
  TF_TEST_SELECT_FORM_ID,
  TF_TEST_RESULT_FORM_ID,
  TF_FINAL_FORM_ID,
} from './trueOrFalse.const';

export const useTrueOrFalseTestSteps = () => {
  const { trueOrFalseTestSelectFormMethods, trueOrFalseTestResultFormMethods } =
    useTrueOrFalseTestFormMethods();

  const [trueOrFalseTestSteps] = useState([
    {
      formId: TF_TEST_SELECT_FORM_ID,
      title: '선택지 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...trueOrFalseTestSelectFormMethods}>
          <DynamicTureOrFalseTestSelectForm handleNext={handleNext} />
        </FormProvider>
      ),
    },

    {
      formId: TF_TEST_RESULT_FORM_ID,
      title: '결과지 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...trueOrFalseTestResultFormMethods}>
          <DynamicTrueOrFalseTestResultForm handleNext={handleNext} />
        </FormProvider>
      ),
    },

    {
      formId: TF_FINAL_FORM_ID,
      title: '최종 확인',
      Element: () => <DynamicTrueOrFalseTestFinalForm />,
    },
  ]);

  return trueOrFalseTestSteps;
};
