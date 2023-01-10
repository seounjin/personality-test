import React from 'react';
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
  optionItems: any;
  onClick: (event, weightedScoreItems) => void;
}

const MainScreen = ({
  question,
  optionItems,
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
              onClick={(e) => onClick(e, weightedScoreItems)}
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
