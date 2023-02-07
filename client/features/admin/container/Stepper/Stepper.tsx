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
  QuestionMarkButtonWrapper,
} from './Stepper.style';
import { useSteps } from '../../hooks/useSteps';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Modal from '../../../../components/Modal/Modal';
import ManualModal from '../ManualModal/ManualModal';
import QuestionMarkButton from '../../components/QuestionMarkButton/QuestionMarkButton';

const Stepper = (): JSX.Element => {
  const { steps } = useSteps();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isActiveStep, setIsActiveStep] = useState(
    steps.map((_, index) => index === 0),
  );
  const [isModalOpen, setIsModalOpen] = useState(true);

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

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const QuestionMarkClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      {isModalOpen && (
        <Modal onClose={handleModal}>
          <ManualModal activeStep={activeStep} />
        </Modal>
      )}

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

      <QuestionMarkButtonWrapper>
        <QuestionMarkButton onClick={QuestionMarkClick} />
      </QuestionMarkButtonWrapper>
    </Container>
  );
};

export default Stepper;
