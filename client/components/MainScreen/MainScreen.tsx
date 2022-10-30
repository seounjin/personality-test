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
  select_1: string;
  select_2: string;
  onClick: (event) => void;
}

const MainScreen = ({
  question,
  select_1,
  select_2,
  onClick,
}: MainProps): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        <QuestionWrapper>
          <Question>{question}</Question>
        </QuestionWrapper>

        <ButtonWrapper>
          <WhiteButton data-id="1" onClick={onClick}>
            {select_1}
          </WhiteButton>

          <BlueButton data-id="2" onClick={onClick}>
            {select_2}
          </BlueButton>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default MainScreen;
