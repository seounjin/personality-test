import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import BasicInformationForm from '../container/BasicInformationForm/BasicInformationForm';
import { useScoreTestFormMethod } from './useScoreTestFormMethod';
import {
  SCORE_TEST_RESULT_FORM_ID,
  SCORE_TEST_SELECT_FORM_ID,
  SCORE_TEST_FINAL_FORM_ID,
} from '../container/ScoreTestContainer/scoreTest.const';
import ScoreTestResultForm from '../container/ScoreTestContainer/ScoreTestResultForm';
import ScoreTestSelectForm from '../container/ScoreTestContainer/ScoreTestSelectForm';
import { BASIC_INFORMATION_FORM_ID } from '../tests.const';
import ScoreTestFinalForm from '../container/ScoreTestContainer/ScoreTestFinalForm';
import {
  MBTI_TEST_RESULT_FORM_ID,
  MBTI_TEST_SELECT_FORM_ID,
  MBTI_TEST_FINAL_FORM_ID,
} from '../container/MbtiTestContainer/mbtiTest.const';
import MbtiTestResultForm from '../container/MbtiTestContainer/MbtiTestResultForm';
import MbtiTestSelectForm from '../container/MbtiTestContainer/MbtiTestSelectForm';
import MbtiTestFinalForm from '../container/MbtiTestContainer/MbtiTestFinalForm';
import { useMbtiTestFormMethods } from './useMbtiTestFormMethods';
import { useTrueOrFalseTestFormMethods } from './useTrueOrFalseTestFormMethods';
import {
  TF_TEST_SELECT_FORM_ID,
  TF_TEST_RESULT_FORM_ID,
  TF_FINAL_FORM_ID,
} from '../container/TrueOrFalseTestContainer/trueOrFalse.const';
import TureOrFalseTestSelectForm from '../container/TrueOrFalseTestContainer/TureOrFalseTestSelectForm';
import TrueOrFalseTestResultForm from '../container/TrueOrFalseTestContainer/TrueOrFalseTestResultForm';
import TrueOrFalseTestFinalForm from '../container/TrueOrFalseTestContainer/TrueOrFalseTestFinalForm';
import { useBasicInfoFormMethods } from './useBasicInfoFormMethods';

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
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: SCORE_TEST_RESULT_FORM_ID,
        title: '유형 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...scoreTestResultFormMethods}>
            <ScoreTestResultForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: SCORE_TEST_SELECT_FORM_ID,
        title: '선택지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...scoreTestSelectFormMethods}>
            <ScoreTestSelectForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: SCORE_TEST_FINAL_FORM_ID,
        title: '최종 확인',
        Element: () => <ScoreTestFinalForm />,
      },
    ],

    mbti: [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInfoFormMethods}>
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: MBTI_TEST_RESULT_FORM_ID,
        title: '유형 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...mbtiTestResultFormMethods}>
            <MbtiTestResultForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: MBTI_TEST_SELECT_FORM_ID,
        title: '선택지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...mbtiTestSelectFormMethods}>
            <MbtiTestSelectForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: MBTI_TEST_FINAL_FORM_ID,
        title: '최종 확인',
        Element: () => <MbtiTestFinalForm />,
      },
    ],

    'true-or-false': [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInfoFormMethods}>
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: TF_TEST_SELECT_FORM_ID,
        title: '선택지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...trueOrFalseTestSelectFormMethods}>
            <TureOrFalseTestSelectForm handleNext={handleNext} />
          </FormProvider>
        ),
      },

      {
        formId: TF_TEST_RESULT_FORM_ID,
        title: '결과지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...trueOrFalseTestResultFormMethods}>
            <TrueOrFalseTestResultForm handleNext={handleNext} />
          </FormProvider>
        ),
      },

      {
        formId: TF_FINAL_FORM_ID,
        title: '최종 확인',
        Element: () => <TrueOrFalseTestFinalForm />,
      },
    ],
  });

  return { steps: steps[testType] };
};
