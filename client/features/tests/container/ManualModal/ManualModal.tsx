import React, { useState } from 'react';
import { ManualItem } from '../../tests.types';
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
  manual: ManualItem;
}

const ManualModal = ({ activeStep, manual }: ManualModalProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(activeStep);

  const { firstStep, lastStep, data } = manual;
  const { title, content } = data[currentSlide];

  const prevButtonClick = () => {
    if (currentSlide === firstStep) return;
    setCurrentSlide((currentSlide) => currentSlide - 1);
  };

  const nextButtonClick = () => {
    if (currentSlide === lastStep) return;

    setCurrentSlide((currentSlide) => currentSlide + 1);
  };

  return (
    <Container>
      <Body>
        <Title>{title}</Title>
        <ContentWrapper>
          {content.split('\n').map((line, index) => {
            const bulletPoint = line.trim()[0];
            return (
              <Content
                key={`l${index}`}
                isListStyle={bulletPoint === '-' ? false : true}
              >
                {line}
              </Content>
            );
          })}
        </ContentWrapper>
      </Body>

      <TwoButtonWrapper>
        <Button
          type="button"
          onClick={prevButtonClick}
          disabled={currentSlide === firstStep}
        >
          <PrevIcon $isDisabled={currentSlide === firstStep} />
        </Button>

        <Button
          type="button"
          onClick={nextButtonClick}
          disabled={currentSlide === lastStep}
        >
          <NextIcon $isDisabled={currentSlide === lastStep} />
        </Button>
      </TwoButtonWrapper>

      <Page>
        {currentSlide + 1} {'/'} {lastStep + 1}
      </Page>
    </Container>
  );
};

export default ManualModal;
