import { useState, useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { Step } from '../admin.types';
import FinalConfirmationForm from '../container/FinalConfirmationForm/FinalConfirmationForm';
import SetSelectFormItems from '../container/SetSelectFormItems/SetSelectFormItems';
import TitleForm from '../container/TitleForm/TitleForm';
import TypeFormSection from '../container/TypeFormSection/TypeFormSection';
import { useFormMethods } from './useFormMethods';

export const useSteps = () => {
  const { titleFormMethods, typeFormMethods, selectFormItemsMethods } =
    useFormMethods();

  const steps = useMemo<Step[]>(
    () => [
      {
        name: 'titleForm',
        Element: ({ handleNext }) => (
          <FormProvider {...titleFormMethods}>
            <TitleForm handleNext={handleNext} />
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
        name: 'resultForm',
        Element: () => <FinalConfirmationForm />,
      },
    ],
    [selectFormItemsMethods, titleFormMethods, typeFormMethods],
  );

  return { steps };
};
