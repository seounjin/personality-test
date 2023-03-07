import React from 'react';
import { OptionItems, WeightedScoreItem } from '../../../../types';
import {
  Container,
  QuestionWrapper,
  Question,
  ButtonWrapper,
  OptionButton,
  Wrapper,
  QuestionIcon,
  QuestionIconWrapper,
} from './MainScreen.style';

interface MainProps {
  question: string;
  optionItems: OptionItems[];
  slideIndex: number;
  onClick: (
    weightedScoreItems: WeightedScoreItem[],
    slideIndex: number,
  ) => void;
}

const MainScreen = ({
  question,
  optionItems,
  slideIndex,
  onClick,
}: MainProps): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <QuestionWrapper>
          <QuestionIconWrapper>
            <QuestionIcon />
          </QuestionIconWrapper>
          <Question>{question}</Question>
        </QuestionWrapper>

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
