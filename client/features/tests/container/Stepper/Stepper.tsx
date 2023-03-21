import { useState } from 'react';
import StepIndicator from '../../../../components/StepIndicator/StepIndicator';
import TwoButton from '../../../../components/TwoButton/TwoButton';
import { STEP_INDICATOR_LABEL } from '../../tests.const';
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
import ScrollTop from '../../components/ScrollTop/ScrollTop';

interface StepperProps {
  testType: string;
}

const Stepper = ({ testType }: StepperProps): JSX.Element => {
  const { steps } = useSteps({ testType });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isActiveStep, setIsActiveStep] = useState(
    steps.map((_, index) => index === 0),
  );

  const [isModalOpen, setIsModalOpen] = useState(true);

  const firstStep = 0;
  const lastStep = steps.length - 1;

  const handlePrev = () => {
    if (activeStep === firstStep) return;
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
      <ScrollTop activeStep={activeStep} />
      {isModalOpen && (
        <Modal onClose={handleModal}>
          <ManualModal activeStep={activeStep} />
        </Modal>
      )}

      <StepTitle>{steps[activeStep].title}</StepTitle>
      <StepIndicator
        currentStep={activeStep}
        isActiveStep={isActiveStep}
        stepLabel={STEP_INDICATOR_LABEL[testType]}
      />

      {steps[activeStep].Element({ handleNext })}

      {activeStep === lastStep && (
        <SubmitButtonWrapper>
          <SubmitButton formId={steps[activeStep].formId} />
        </SubmitButtonWrapper>
      )}

      <TwoButtonWrapper>
        <TwoButton
          leftButton={handlePrev}
          leftName={'이전'}
          rightName={'다음'}
          leftDisabled={activeStep === firstStep}
          rightDisabled={activeStep === lastStep}
          leftType={'button'}
          rightType={'submit'}
          form={activeStep !== lastStep ? steps[activeStep].formId : ''}
        />
      </TwoButtonWrapper>

      <QuestionMarkButtonWrapper>
        <QuestionMarkButton onClick={QuestionMarkClick} />
      </QuestionMarkButtonWrapper>
    </Container>
  );
};

export default Stepper;
