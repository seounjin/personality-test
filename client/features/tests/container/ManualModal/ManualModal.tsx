import React, { useState } from 'react';
import {
  BASIC_INFORMATION_FORM,
  FINAL_CONFIRMATION,
  MANUAL_DATA,
} from '../../tests.const';
import {
  Body,
  Button,
  Container,
  Content,
  ContentWrapper,
  NextIcon,
  Page,
  PrevIcon,
  Title,
  TwoButtonWrapper,
} from './ManualModal.style';

interface ManualModalProps {
  activeStep: number;
}

const ManualModal = ({ activeStep }: ManualModalProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(activeStep);

  const { title, content } = MANUAL_DATA[currentSlide];

  const prevButtonClick = () => {
    if (BASIC_INFORMATION_FORM === currentSlide) return;
    setCurrentSlide((currentSlide) => currentSlide - 1);
  };

  const nextButtonClick = () => {
    if (FINAL_CONFIRMATION === currentSlide) return;

    setCurrentSlide((currentSlide) => currentSlide + 1);
  };

  return (
    <Container>
      <Body>
        <Title>{title}</Title>
        <ContentWrapper>
          {content.split('\n').map((line, index) => (
            <Content key={`l${index}`}>{line}</Content>
          ))}
        </ContentWrapper>
      </Body>

      <TwoButtonWrapper>
        <Button
          type="button"
          onClick={prevButtonClick}
          disabled={currentSlide === BASIC_INFORMATION_FORM}
        >
          <PrevIcon $isDisabled={currentSlide === BASIC_INFORMATION_FORM} />
        </Button>

        <Button
          type="button"
          onClick={nextButtonClick}
          disabled={currentSlide === FINAL_CONFIRMATION}
        >
          <NextIcon $isDisabled={currentSlide === FINAL_CONFIRMATION} />
        </Button>
      </TwoButtonWrapper>

      <Page>
        {currentSlide + 1} {'/'} {FINAL_CONFIRMATION + 1}
      </Page>
    </Container>
  );
};

export default ManualModal;
