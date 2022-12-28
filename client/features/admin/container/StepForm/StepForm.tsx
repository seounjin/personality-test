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
import SetSelectItemsForm from '../SetSelectItemsForm/SetSelectItemsForm';
import TitleForm from '../TitleForm/TitleForm';
import TypeFormSection from '../TypeFormSection/TypeFormSection';
import {
  TwoButtonWrapper,
  Container,
  Form,
  StepTitle,
  SubmitButtonWrapper,
} from './StepForm.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormData } from './StepForm.type';
import { Button } from '../../../../components/TwoButton/TwoButton.style';

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
    { question: '', optionItems: [{ option: '', weightCheckboxes: [] }] },
  ],
  typesDictionary: {},
};

const optionItemsArray = yup.array().of(
  yup.object().shape({
    option: yup.string().required('한 글자 이상 채워주세요'),
    weightCheckboxes: yup
      .array()
      .of(
        yup.object().shape({
          isChecked: yup.boolean(),
        }),
      )
      .test('checkboxValidation', '하나 이상 체크해주세요', (items) => {
        return items.some(({ isChecked }) => isChecked);
      }),
  }),
);

const validationSchema = [
  yup.object({
    title: yup.string().required('한 글자 이상 채워 주세요'),
    explain: yup.string().required('한 글자 이상 채워 주세요'),
  }),
  yup.object({
    typeFormItems: yup.array().of(
      yup.object().shape({
        typeContent: yup.string().required('한 글자 이상 채워 주세요'),
        explanationContent: yup.string().required('한 글자 이상 채워 주세요'),
      }),
    ),
  }),
  yup.object({
    selectItems: yup.array().of(
      yup.object().shape({
        question: yup.string().required('한 글자 이상 채워 주세요'),
        optionItems: optionItemsArray,
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
  const { getValues, setValue, trigger, handleSubmit } = methods;

  const handlePrev = () => {
    if (activeStep === SET_TITLE_ITEM_STEP) return;

    const copyArray = [...isActiveStep];
    copyArray[activeStep] = false;
    setIsActiveStep(copyArray);
    setActiveStep((activeStep) => activeStep - 1);
  };

  const setWeightCheckboxes = () => {
    const selectItems = getValues('selectItems')[0];
    const optionItems = selectItems.optionItems[0];

    setValue('selectItems', [
      {
        ...selectItems,
        optionItems: [
          {
            ...optionItems,
            weightCheckboxes: getValues('typeFormItems').map(
              ({ typeContent }) => ({ isChecked: false, value: typeContent }),
            ),
          },
        ],
      },
    ]);
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) return;

    if (activeStep === SET_TYPE_ITEMS_STEP) {
      setValue(
        'typesDictionary',
        getValues('typeFormItems').reduce(
          (dic, { typeContent }) => ({ ...dic, [typeContent]: 0 }),
          {},
        ),
      );
      setWeightCheckboxes();
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
        return <SetSelectItemsForm />;
    }
  };

  const duplicateCheckToWeight = (typesDictionary) => {
    const set = new Set();
    for (const key in typesDictionary) {
      set.add(typesDictionary[key]);
    }
    return set.size !== Object.keys(typesDictionary).length;
  };

  const onSubmit = (value) => {
    const { title, explain, selectItems, typeFormItems, typesDictionary } =
      value;

    if (duplicateCheckToWeight(typesDictionary)) {
      alert('중복된 가중치 카운트가 있습니다.');
      return;
    }

    console.log('value', value);
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
        {SET_SELECT_ITEMS_STEP === activeStep && (
          <SubmitButtonWrapper>
            <Button onClick={handleSubmit(onSubmit)}>등록</Button>
          </SubmitButtonWrapper>
        )}
      </FormProvider>
      <TwoButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={activeStep === SET_TITLE_ITEM_STEP}
          rightDisabled={activeStep === SET_SELECT_ITEMS_STEP}
        />
      </TwoButtonWrapper>
    </Container>
  );
};

export default StepForm;
