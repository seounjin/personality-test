import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  setTypeItemList,
  setTypeItemsDictionary,
} from '../../../../store/modules/admin';
import {
  SET_SELECT_FORM_ITEMS,
  SET_TYPE_ITEMS,
  CREATE_TITLE_ITEM_STEP,
  IMAGE_UPLOAD_STEP,
  STEP_TITLE,
} from '../../admin.const';
import { useImageUploadStep } from '../../admin.hook';
import ImageUpload from '../ImageUpload/ImageUpload';
import SetSelectForm from '../SetSelectForm/SetSelectForm';
import TitleForm from '../TitleForm/TitleForm';
import TypeFormSection from '../TypeFormSection/TypeFormSection';
import { ButtonWrapper, Container, Form, StepTitle } from './StepForm.style';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  title: '',
  explain: '',
};

const validationSchema = [
  yup.object({
    title: yup.string().required(),
    explain: yup.string().required(),
  }),
];

const StepForm = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [isStepActive, setIsStepActive] = useState(
    STEP_TITLE.map((_, index) => index === 0),
  );
  const dispatch = useDispatch();

  const { imgFile, handleImgFile } = useImageUploadStep();

  const currentValidationSchema = validationSchema[step];

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: 'onChange',
  });
  const { handleSubmit, trigger } = methods;

  const handlePrev = () => {
    if (step === CREATE_TITLE_ITEM_STEP) return;

    const copyArray = [...isStepActive];
    copyArray[step] = false;
    setIsStepActive(copyArray);
    setStep((step) => step - 1);
  };

  const handleNext = async () => {
    const isStepValid = await trigger();

    // if (SET_TYPE_ITEMS === step) {
    //   dispatch(setTypeItemsDictionary());
    //   dispatch(setTypeItemList());
    // }

    // const copyArray = [...isStepActive];
    // copyArray[step + 1] = true;
    // setIsStepActive(copyArray);
    // setStep((step) => step + 1);
  };

  return (
    <Container>
      <StepTitle>{STEP_TITLE[step]}</StepTitle>
      <StepIndicator
        currentStep={step}
        isStepActive={isStepActive}
        stepLabel={STEP_TITLE}
      />
      <FormProvider {...methods}>
        <Form>
          {step === CREATE_TITLE_ITEM_STEP && <TitleForm />}
          {step === IMAGE_UPLOAD_STEP && (
            <ImageUpload handleImgFile={handleImgFile} />
          )}
          {step === SET_TYPE_ITEMS && <TypeFormSection />}
          {step === SET_SELECT_FORM_ITEMS && <SetSelectForm />}
        </Form>
      </FormProvider>
      <ButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={step === CREATE_TITLE_ITEM_STEP}
          rightDisabled={step === SET_SELECT_FORM_ITEMS}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
