import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import { setTypeItemsDictionary } from '../../../../store/modules/admin';
import {
  SET_TITLE_ITEM_STEP,
  SET_TYPE_ITEMS_STEP,
  SET_SELECT_ITEMS_STEP,
  STEP_TITLE,
} from '../../admin.const';
import SetSelectForm from '../SetSelectForm/SetSelectForm';
import TitleForm from '../TitleForm/TitleForm';
import TypeFormSection from '../TypeFormSection/TypeFormSection';
import { ButtonWrapper, Container, Form, StepTitle } from './StepForm.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormData } from './StepForm.type';

const defaultValues = {
  title: '',
  explain: '',
  typeFormItems: [
    {
      typeContent: '',
      explanationContent: '',
    },
  ],
  selectItems: [
    { question: '', optionItems: [{ option: '' }], weightCheckboxes: [] },
  ],
};

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup.string().required('한글자 이상 채워주세요'),
  }),
);

const validationSchema = [
  yup.object({
    title: yup.string().required(),
    explain: yup.string().required(),
  }),
  yup.object({
    typeFormItems: yup.array().of(
      yup.object().shape({
        typeContent: yup.string().required('한글자 이상 채워 주세요'),
        explanationContent: yup.string().required('한글자 이상 채워 주세요'),
      }),
    ),
  }),
  yup.object({
    selectItems: yup.array().of(
      yup.object().shape({
        question: yup.string().required('한글자 이상 채워 주세요'),
        optionItems: optionItemsArray,
        weightCheckboxes: yup
          .array()
          .min(1, 'You didnt enter enough')
          .required('Required'),
      }),
    ),
  }),
];

const StepForm = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isActiveStep, setIsActiveStep] = useState(
    STEP_TITLE.map((_, index) => index === 0),
  );
  const dispatch = useDispatch();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: 'onChange',
  });
  const { getValues, handleSubmit, trigger } = methods;

  const handlePrev = () => {
    if (activeStep === SET_TITLE_ITEM_STEP) return;

    const copyArray = [...isActiveStep];
    copyArray[activeStep] = false;
    setIsActiveStep(copyArray);
    setActiveStep((activeStep) => activeStep - 1);
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) return;

    if (activeStep === SET_TYPE_ITEMS_STEP) {
      dispatch(
        setTypeItemsDictionary({
          typeFormItems: getValues('typeFormItems').map(
            ({ typeContent }) => typeContent,
          ),
        }),
      );
    }

    const copyArray = [...isActiveStep];
    copyArray[activeStep + 1] = true;
    setIsActiveStep(copyArray);
    setActiveStep((activeStep) => activeStep + 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case SET_TITLE_ITEM_STEP:
        return <TitleForm />;
      case SET_TYPE_ITEMS_STEP:
        return <TypeFormSection />;
      case SET_SELECT_ITEMS_STEP:
        return <SetSelectForm />;
    }
  };

  return (
    <Container>
      <StepTitle>{STEP_TITLE[activeStep]}</StepTitle>
      <StepIndicator
        currentStep={activeStep}
        isActiveStep={isActiveStep}
        stepLabel={STEP_TITLE}
      />
      <FormProvider {...methods}>
        <Form>{getStepContent(activeStep)}</Form>
      </FormProvider>
      <ButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={activeStep === SET_TITLE_ITEM_STEP}
          rightDisabled={activeStep === SET_SELECT_ITEMS_STEP}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
