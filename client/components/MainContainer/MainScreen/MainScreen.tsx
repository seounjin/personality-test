import React from 'react';
import {
  Container,
  QuestionWrapper,
  Question,
  ButtonWrapper,
  BlueButton,
  WhiteButton,
} from './MainScreen.style';

interface MainProps {
  opacity: number;
  question: string;
  select_1: string;
  select_2: string;
  handleButtonClick: (event) => void;
}

const MainScreen = ({
  opacity,
  question,
  select_1,
  select_2,
  handleButtonClick,
}: MainProps): JSX.Element => {
  return (
    <Container opacity={opacity}>
      <QuestionWrapper>
        <Question>{question}</Question>
      </QuestionWrapper>

      <ButtonWrapper>
        <WhiteButton data-id="1" onClick={handleButtonClick}>
          {select_1}
        </WhiteButton>

        <BlueButton data-id="2" onClick={handleButtonClick}>
          {select_2}
        </BlueButton>
      </ButtonWrapper>
    </Container>
  );
};

export default MainScreen;
