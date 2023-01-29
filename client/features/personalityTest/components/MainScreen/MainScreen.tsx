import React from 'react';
import { OptionItems, WeightedScoreItem } from '../../../../types';
import {
  Container,
  QuestionWrapper,
  Question,
  ButtonWrapper,
  BlueButton,
  WhiteButton,
  Wrapper,
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
          <Question>{question}</Question>
        </QuestionWrapper>

        <ButtonWrapper>
          {optionItems.map(({ option, weightedScoreItems }, index) => (
            <WhiteButton
              onClick={() => onClick(weightedScoreItems, slideIndex + 1)}
              key={`o${index}`}
            >
              {option}
            </WhiteButton>
          ))}
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default MainScreen;
