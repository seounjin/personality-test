import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  DynamicMbtiTestResultForm,
  DynamicMbtiTestSelectForm,
  DynamicMbtiTestFinalForm,
} from '.';
import { useMbtiTestFormMethods } from '../../hooks/useMbtiTestFormMethods';
import {
  MBTI_TEST_RESULT_FORM_ID,
  MBTI_TEST_SELECT_FORM_ID,
  MBTI_TEST_FINAL_FORM_ID,
} from './mbtiTest.const';

export const useMbtiTestSteps = () => {
  const { mbtiTestResultFormMethods, mbtiTestSelectFormMethods } =
    useMbtiTestFormMethods();

  const [mbtiTestSteps] = useState([
    {
      formId: MBTI_TEST_RESULT_FORM_ID,
      title: '유형 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...mbtiTestResultFormMethods}>
          <DynamicMbtiTestResultForm handleNext={handleNext} />
        </FormProvider>
      ),
    },
    {
      formId: MBTI_TEST_SELECT_FORM_ID,
      title: '선택지 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...mbtiTestSelectFormMethods}>
          <DynamicMbtiTestSelectForm handleNext={handleNext} />
        </FormProvider>
      ),
    },
    {
      formId: MBTI_TEST_FINAL_FORM_ID,
      title: '최종 확인',
      Element: () => <DynamicMbtiTestFinalForm />,
    },
  ]);

  return mbtiTestSteps;
};
