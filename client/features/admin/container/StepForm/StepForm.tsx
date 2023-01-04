import { useState } from 'react';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import {
  SET_TITLE_ITEM_STEP,
  STEP_TITLE,
  FINAL_CONFIRMATION,
} from '../../admin.const';
import { TwoButtonWrapper, Container, StepTitle } from './StepForm.style';
import { useSteps } from '../../hooks/useSteps';

const StepForm = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isActiveStep, setIsActiveStep] = useState(
    STEP_TITLE.map((_, index) => index === 0),
  );

  const { steps } = useSteps();

  const handlePrev = () => {
    if (activeStep === SET_TITLE_ITEM_STEP) return;
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

      <TwoButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={activeStep === SET_TITLE_ITEM_STEP}
          rightDisabled={activeStep === FINAL_CONFIRMATION}
          leftType={'button'}
          rightType={'submit'}
          form={steps[activeStep].name}
        />
      </TwoButtonWrapper>
    </Container>
  );
};

export default StepForm;
