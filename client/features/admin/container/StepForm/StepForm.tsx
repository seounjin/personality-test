import { useState } from 'react';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  BASIC_INFORMATION_FORM,
  STEP_TITLE,
  FINAL_CONFIRMATION,
  FINAL_CONFIRMATION_FORM_ID,
} from '../../admin.const';
import {
  TwoButtonWrapper,
  Container,
  StepTitle,
  SubmitButtonWrapper,
} from './StepForm.style';
import { useSteps } from '../../hooks/useSteps';
import SubmitButton from '../../components/SubmitButton/SubmitButton';

const StepForm = (): JSX.Element => {
  const { steps } = useSteps();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isActiveStep, setIsActiveStep] = useState(
    steps.map((_, index) => index === 0),
  );

  const handlePrev = () => {
    if (activeStep === BASIC_INFORMATION_FORM) return;
    const copyArray = [...isActiveStep];
    copyArray[activeStep] = false;
    setIsActiveStep(copyArray);
    setActiveStep((activeStep) => activeStep - 1);
  };

  const handleNext = () => {
    const copyArray = [...isActiveStep];
    copyArray[activeStep + 1] = true;
    setIsActiveStep(copyArray);
    setActiveStep((activeStep) => activeStep + 1);
  };

  return (
    <Container>
      <StepTitle>{STEP_TITLE[activeStep]}</StepTitle>
      <StepIndicator
        currentStep={activeStep}
        isActiveStep={isActiveStep}
        stepLabel={STEP_TITLE}
      />

      {steps[activeStep].Element({ handleNext })}

      {activeStep === FINAL_CONFIRMATION && (
        <SubmitButtonWrapper>
          <SubmitButton formId={FINAL_CONFIRMATION_FORM_ID} />
        </SubmitButtonWrapper>
      )}

      <TwoButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={activeStep === BASIC_INFORMATION_FORM}
          rightDisabled={activeStep === FINAL_CONFIRMATION}
          leftType={'button'}
          rightType={'submit'}
          form={activeStep !== FINAL_CONFIRMATION ? steps[activeStep].name : ''}
        />
      </TwoButtonWrapper>
    </Container>
  );
};

export default StepForm;
