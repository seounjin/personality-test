import {
  TitleWrapper,
  Title,
  Wrapper,
  Container,
} from '../../features/admin/admin.styles';

import { useState } from 'react';
import StepForm from '../../features/admin/container/StepForm/StepForm';

const Admin = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const onPrev = () => {
    if (step < 1) return;
    setStep((step) => step - 1);
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>만들어 보아요</Title>
        </TitleWrapper>
        <StepForm step={step} onPrev={onPrev} onNext={onNext} />
      </Container>
    </Wrapper>
  );
};

export default Admin;
