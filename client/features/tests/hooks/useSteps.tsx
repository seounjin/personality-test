import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useScoreTestFormMethod } from './useScoreTestFormMethod';
import {
  SCORE_TEST_RESULT_FORM_ID,
  SCORE_TEST_SELECT_FORM_ID,
  SCORE_TEST_FINAL_FORM_ID,
} from '../container/ScoreTestContainer/scoreTest.const';
import { BASIC_INFORMATION_FORM_ID } from '../tests.const';
import {
  MBTI_TEST_RESULT_FORM_ID,
  MBTI_TEST_SELECT_FORM_ID,
  MBTI_TEST_FINAL_FORM_ID,
} from '../container/MbtiTestContainer/mbtiTest.const';
import { useMbtiTestFormMethods } from './useMbtiTestFormMethods';
import { useTrueOrFalseTestFormMethods } from './useTrueOrFalseTestFormMethods';
import {
  TF_TEST_SELECT_FORM_ID,
  TF_TEST_RESULT_FORM_ID,
  TF_FINAL_FORM_ID,
} from '../container/TrueOrFalseTestContainer/trueOrFalse.const';
import { useBasicInfoFormMethods } from './useBasicInfoFormMethods';
import { DynamicBasicInformationForm } from '../container/BasicInformationForm/DynamicBasicInformationForm';
import {
  DynamicScoreTestResultForm,
  DynamicScoreTestSelectForm,
  DynamicScoreTestFinalForm,
} from '../container/ScoreTestContainer';
import {
  DynamicMbtiTestResultForm,
  DynamicMbtiTestSelectForm,
  DynamicMbtiTestFinalForm,
} from '../container/MbtiTestContainer';
import {
  DynamicTureOrFalseTestSelectForm,
  DynamicTrueOrFalseTestResultForm,
  DynamicTrueOrFalseTestFinalForm,
} from '../container/TrueOrFalseTestContainer';

export const useSteps = ({ testType = 'score' }: { testType: string }) => {
  const { basicInfoFormMethods } = useBasicInfoFormMethods();

  const { scoreTestResultFormMethods, scoreTestSelectFormMethods } =
    useScoreTestFormMethod();

  const { mbtiTestResultFormMethods, mbtiTestSelectFormMethods } =
    useMbtiTestFormMethods();

  const { trueOrFalseTestSelectFormMethods, trueOrFalseTestResultFormMethods } =
    useTrueOrFalseTestFormMethods();
  const [steps] = useState({
    score: [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInfoFormMethods}>
            <DynamicBasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
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
    ],

    mbti: [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInfoFormMethods}>
            <DynamicBasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
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
    ],

    'true-or-false': [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInfoFormMethods}>
            <DynamicBasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
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
    ],
  });

  return { steps: steps[testType] };
};
