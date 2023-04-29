import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useBasicInfoFormMethods } from '../../hooks/useBasicInfoFormMethods';
import { BASIC_INFORMATION_FORM_ID } from '../../tests.const';
import { DynamicBasicInformationForm } from './DynamicBasicInformationForm';

export const useBasicInformationFormStep = () => {
  const { basicInfoFormMethods } = useBasicInfoFormMethods();

  const [basicInformationFormStep] = useState([
    {
      formId: BASIC_INFORMATION_FORM_ID,
      title: '기본정보 입력',
      Element: ({ handleNext }) => (
        <FormProvider {...basicInfoFormMethods}>
          <DynamicBasicInformationForm handleNext={handleNext} />
        </FormProvider>
      ),
    },
  ]);

  return basicInformationFormStep;
};
