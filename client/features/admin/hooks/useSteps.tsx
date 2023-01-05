import { useState, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { Step } from '../admin.types';
import FinalConfirmationForm from '../container/FinalConfirmationForm/FinalConfirmationForm';
import SetSelectFormItems from '../container/SetSelectFormItems/SetSelectFormItems';
import BasicInformationForm from '../container/BasicInformationForm/BasicInformationForm';
import TypeFormSection from '../container/TypeFormSection/TypeFormSection';
import { useFormMethods } from './useFormMethods';

export const useSteps = () => {
  const {
    basicInformationFormMethods,
    typeFormMethods,
    selectFormItemsMethods,
  } = useFormMethods();

  const steps = useMemo<Step[]>(
    () => [
      {
        name: 'basicInformationForm',
        Element: ({ handleNext }) => (
          <FormProvider {...basicInformationFormMethods}>
            <BasicInformationForm handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        name: 'typeForm',
        Element: ({ handleNext }) => (
          <FormProvider {...typeFormMethods}>
            <TypeFormSection handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        name: 'selectForm',
        Element: ({ handleNext }) => (
          <FormProvider {...selectFormItemsMethods}>
            <SetSelectFormItems handleNext={handleNext} />
          </FormProvider>
        ),
      },
      {
        name: 'finalConfirmationForm',
        Element: () => <FinalConfirmationForm />,
      },
    ],
    [selectFormItemsMethods, basicInformationFormMethods, typeFormMethods],
  );

  return { steps };
};
