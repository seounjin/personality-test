import { useScoreTestFormMethod } from '../../hooks/useScoreTestFormMethod';
import {
  SCORE_TEST_RESULT_FORM_ID,
  SCORE_TEST_SELECT_FORM_ID,
  SCORE_TEST_FINAL_FORM_ID,
} from './scoreTest.const';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import {
  DynamicScoreTestFinalForm,
  DynamicScoreTestResultForm,
  DynamicScoreTestSelectForm,
} from '.';

export const useScoreTestSteps = () => {
  const { scoreTestResultFormMethods, scoreTestSelectFormMethods } =
    useScoreTestFormMethod();

  const [scoreTestSteps] = useState([
    {
      formId: SCORE_TEST_RESULT_FORM_ID,
      title: '유형 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...scoreTestResultFormMethods}>
          <DynamicScoreTestResultForm handleNext={handleNext} />
        </FormProvider>
      ),
    },

    {
      formId: SCORE_TEST_SELECT_FORM_ID,
      title: '선택지 설정',
      Element: ({ handleNext }) => (
        <FormProvider {...scoreTestSelectFormMethods}>
          <DynamicScoreTestSelectForm handleNext={handleNext} />
        </FormProvider>
      ),
    },

    {
      formId: SCORE_TEST_FINAL_FORM_ID,
      title: '최종 확인',
      Element: () => <DynamicScoreTestFinalForm />,
    },
  ]);

  return scoreTestSteps;
};
