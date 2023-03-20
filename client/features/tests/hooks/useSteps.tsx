import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import BasicInformationForm from '../container/BasicInformationForm/BasicInformationForm';
import { useFormMethods } from './useFormMethods';
import SetTureOrFalseSelectFormItems from '../container/SetTureOrFalseSelectFormItems/SetTureOrFalseSelectFormItems';
import TrueOrFalseResultFormSection from '../container/TrueOrFalseResultFormSection/TrueOrFalseResultFormSection';
import FinalConfirmationTrueOrFalseForm from '../container/FinalConfirmationTrueOrFalseForm/FinalConfirmationTrueOrFalseForm';
import { useScoreTestFormMethod } from './useScoreTestFormMethod';
import {
  SCORE_TEST_RESULT_FORM_ID,
  SCORE_TEST_SELECT_FORM_ID,
  SCORE_TEST_FINAL_FORM_ID,
} from '../container/ScoreTestTypeContainer/scoreTestType.const';
import ScoreTestResultForm from '../container/ScoreTestTypeContainer/ScoreTestResultForm';
import ScoreTestSelectForm from '../container/ScoreTestTypeContainer/ScoreTestSelectForm';
import { BASIC_INFORMATION_FORM_ID } from '../tests.const';
import ScoreTestFinalForm from '../container/ScoreTestTypeContainer/ScoreTestFinalForm';
import {
  MBTI_TEST_RESULT_FORM_ID,
  MBTI_TEST_SELECT_FORM_ID,
  MBTI_TEST_FINAL_FORM_ID,
} from '../container/MbtiTestTypeContainer/mbtiTestType.const';
import MbtiTestResultForm from '../container/MbtiTestTypeContainer/MbtiTestResultForm';
import MbtiTestSelectForm from '../container/MbtiTestTypeContainer/MbtiTestSelectForm';
import MbtiTestFinalForm from '../container/MbtiTestTypeContainer/MbtiTestFinalForm';
import { useMbtiTestFormMethods } from './useMbtiTestFormMethods';

export const useSteps = ({ testType = 'score' }: { testType: string }) => {
  const {
    basicInformationFormMethods,
    trueOrFalseSelectFormItemsMethods,
    trueOrFalseResultFormItemsMethods,
  } = useFormMethods();

  const { scoreTestResultFormMethods, scoreTestSelectFormMethods } =
    useScoreTestFormMethod();

  const { mbtiTestResultFormMethods, mbtiTestSelectFormMethods } =
    useMbtiTestFormMethods();

  const [steps] = useState({
    score: [
      {
        formId: BASIC_INFORMATION_FORM_ID,
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInformationFormMethods}>
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
          <FormProvider {...basicInformationFormMethods}>
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

    trueOrFalse: [
      {
        formId: 'basicInformationForm',
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInformationFormMethods}>
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: 'trueOrFalseSelectForm',
        title: '선택지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...trueOrFalseSelectFormItemsMethods}>
            <SetTureOrFalseSelectFormItems handleNext={handleNext} />
          </FormProvider>
        ),
      },

      {
        formId: 'trueOrFalseResultForm',
        title: '결과지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...trueOrFalseResultFormItemsMethods}>
            <TrueOrFalseResultFormSection handleNext={handleNext} />
          </FormProvider>
        ),
      },

      {
        formId: 'finalConfirmationForm',
        title: '최종 확인',
        Element: () => <FinalConfirmationTrueOrFalseForm />,
      },
    ],
  });

  return { steps: steps[testType] };
};
