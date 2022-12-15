import { useState } from 'react';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  SET_SELECT_FORM_ITEMS,
  SET_TYPE_ITEMS,
  CREATE_SELECT_ITEMS_STEP,
  CREATE_RESULT_ITEMS_STEP,
  CREATE_TITLE_ITEM_STEP,
  IMAGE_UPLOAD_STEP,
  STEP_TITLE,
} from '../../admin.const';
import {
  useImageUploadStep,
  useResultStep,
  useSelectStep,
  useSetSelectFormStep,
} from '../../admin.hook';
import ImageUpload from '../ImageUpload/ImageUpload';
import ResultCard from '../ResultCard/ResultCard';
import SelectCard from '../SelectCard/SelectCard';
import SetSelectFormSection from '../SetSelectForm/SetSelectForm';
import TitleForm from '../TitleForm/TitleForm';
import TypeForm from '../TypeFormSection/TypeFormSection';
import { ButtonWrapper, Container, StepTitle } from './StepForm.style';

const StepForm = (): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [isStepActive, setIsStepActive] = useState(
    STEP_TITLE.map((_, index) => index === 0),
  );

  const { imgFile, handleImgFile } = useImageUploadStep();
  const { setSelectFromStep } = useSetSelectFormStep();
  const { createResultItems } = useSelectStep();
  const { handleSubmit } = useResultStep(imgFile);

  const handlePrev = () => {
    if (step === CREATE_TITLE_ITEM_STEP) return;

    const copyArray = [...isStepActive];
    copyArray[step] = false;
    setIsStepActive(copyArray);
    setStep((step) => step - 1);
  };

  const handleNext = () => {
    if (step === CREATE_SELECT_ITEMS_STEP) {
      createResultItems();
    }

    if (step === SET_SELECT_FORM_ITEMS) {
      setSelectFromStep();
    }

    if (step === CREATE_RESULT_ITEMS_STEP) {
      return;
    }

    const copyArray = [...isStepActive];
    copyArray[step + 1] = true;
    setIsStepActive(copyArray);
    setStep((step) => step + 1);
  };

  return (
    <Container>
      <StepTitle>{STEP_TITLE[step]}</StepTitle>
      <StepIndicator
        currentStep={step}
        isStepActive={isStepActive}
        stepLabel={STEP_TITLE}
      />
      {step === CREATE_TITLE_ITEM_STEP && <TitleForm />}
      {step === IMAGE_UPLOAD_STEP && (
        <ImageUpload handleImgFile={handleImgFile} />
      )}
      {step === SET_TYPE_ITEMS && <TypeForm />}
      {step === SET_SELECT_FORM_ITEMS && <SetSelectFormSection />}
      {step === CREATE_SELECT_ITEMS_STEP && <SelectCard />}
      {/* {step === CREATE_RESULT_ITEMS_STEP && (
        <ResultCard onSubmit={handleSubmit} />
      )} */}

      <ButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          rightButton={handleNext}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={step === CREATE_TITLE_ITEM_STEP}
          rightDisabled={step === CREATE_RESULT_ITEMS_STEP}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default StepForm;
