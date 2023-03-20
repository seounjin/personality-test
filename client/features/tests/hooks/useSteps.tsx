import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import FinalConfirmationForm from '../container/FinalConfirmationForm/FinalConfirmationForm';
import SetSelectFormItems from '../container/SetSelectFormItems/SetSelectFormItems';
import BasicInformationForm from '../container/BasicInformationForm/BasicInformationForm';
import TypeFormSection from '../container/TypeFormSection/TypeFormSection';
import { useFormMethods } from './useFormMethods';
import MbtiTypeFormSection from '../container/MbtiTypeFormSection/MbtiTypeFormSection';
import SetMbtiSelectFormItems from '../container/SetMbtiSelectFormItems/SetMbtiSelectFormItems';
import FinalConfirmationMbtiForm from '../container/FinalConfirmationMbtiForm/FinalConfirmationMbtiForm';
import SetTureOrFalseSelectFormItems from '../container/SetTureOrFalseSelectFormItems/SetTureOrFalseSelectFormItems';
import TrueOrFalseResultFormSection from '../container/TrueOrFalseResultFormSection/TrueOrFalseResultFormSection';
import FinalConfirmationTrueOrFalseForm from '../container/FinalConfirmationTrueOrFalseForm/FinalConfirmationTrueOrFalseForm';
import { useScoreTestFormMethod } from './useScoreTestFormMethod';
import {
  SCORE_TEST_RESULT_FORM_ID,
  SCORE_TEST_SELECT_FORM_ID,
  SCORE_TEST_FINAL_FORM_ID,
} from '../container/ScoreTestTypeContainer/ScoreTestTypeContainer.const';
import ScoreTestResultForm from '../container/ScoreTestTypeContainer/ScoreTestResultForm';
import ScoreTestSelectForm from '../container/ScoreTestTypeContainer/ScoreTestSelectForm';
import { BASIC_INFORMATION_FORM_ID } from '../tests.const';
import ScoreTestFinalForm from '../container/ScoreTestTypeContainer/ScoreTestFinalForm';

export const useSteps = ({ testType = 'score' }: { testType: string }) => {
  const {
    basicInformationFormMethods,
    typeFormMethods,
    selectFormItemsMethods,
    mbtiTypeFormMethods,
    mbtiSelectFormItemsMethods,
    trueOrFalseSelectFormItemsMethods,
    trueOrFalseResultFormItemsMethods,
  } = useFormMethods();

  const { scoreTestResultFormMethods, scoreTestSelectFormMethods } =
    useScoreTestFormMethod();

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
        formId: 'basicInformationForm',
        title: '기본정보 입력',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInformationFormMethods}>
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: 'mbtiTypeForm',
        title: '유형 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...mbtiTypeFormMethods}>
            <MbtiTypeFormSection handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: 'mbtiSelectForm',
        title: '선택지 설정',
        Element: ({ handleNext }) => (
          <FormProvider {...mbtiSelectFormItemsMethods}>
            <SetMbtiSelectFormItems handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        formId: 'finalConfirmationForm',
        title: '최종 확인',
        Element: () => <FinalConfirmationMbtiForm />,
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
