import React from 'react';
import { OptionItems, WeightedScoreItem } from '../../../../types';
import ProgressBar from '../ProgressBar/ProgressBar';
import {
  Container,
  QuestionWrapper,
  Question,
  ButtonWrapper,
  OptionButton,
  Wrapper,
  QuestionIcon,
  QuestionIconWrapper,
  TopSection,
} from './MainScreen.style';

interface MainProps {
  question: string;
  optionItems: OptionItems[];
  slideIndex: number;
  totalStep: number;
  onClick: (
    weightedScoreItems: WeightedScoreItem[],
    slideIndex: number,
  ) => void;
}

const MainScreen = ({
  question,
  optionItems,
  slideIndex,
  totalStep,
  onClick,
}: MainProps): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <TopSection>
          <ProgressBar totalStep={totalStep} activeStep={slideIndex + 1} />
          <QuestionIconWrapper>
            <QuestionIcon className="question_icon" />
            {slideIndex + 1}
            {'.'}
          </QuestionIconWrapper>
          <QuestionWrapper>
            <Question>{question}</Question>
          </QuestionWrapper>
        </TopSection>

        <ButtonWrapper>
          {optionItems.map(({ option, weightedScoreItems }, index) => (
            <OptionButton
              onClick={() => onClick(weightedScoreItems, slideIndex + 1)}
              key={`o${index}`}
            >
              {option}
            </OptionButton>
          ))}
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default MainScreen;
