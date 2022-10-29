import React from 'react';
import {
  Container,
  Content,
  ContentWrapper,
  RestartButton,
  Title,
  TitleWrapper,
} from './LastScreen.style';
import BackgroundImg from '../../BackgroundImage/BackgroundImage';

interface LastScreenData {
  who: string;
  content: string;
}

interface LastScreenProps {
  lastScreenData: LastScreenData;
  handleReStartClick: () => void;
}

const LastScreen = ({
  lastScreenData,
  handleReStartClick,
}: LastScreenProps): JSX.Element => {
  const { who, content } = lastScreenData;

  return (
    <BackgroundImg>
      <Container>
        <TitleWrapper>
          <Title>{who}</Title>
        </TitleWrapper>
        <ContentWrapper>
          <Content> {content}</Content>
        </ContentWrapper>
        <RestartButton onClick={handleReStartClick} />
      </Container>
    </BackgroundImg>
  );
};

export default LastScreen;
