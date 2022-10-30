import React from 'react';
import {
  Container,
  Content,
  ContentWrapper,
  RestartButton,
  Title,
  TitleWrapper,
} from './LastScreen.style';

interface LastScreenData {
  who: string;
  content: string;
}

interface LastScreenProps {
  data: LastScreenData;
  onClick: () => void;
}

const LastScreen = ({ data, onClick }: LastScreenProps): JSX.Element => {
  const { who, content } = data;

  return (
    <Container>
      <TitleWrapper>
        <Title>{who}</Title>
      </TitleWrapper>
      <ContentWrapper>
        <Content> {content}</Content>
      </ContentWrapper>
      <RestartButton onClick={onClick} />
    </Container>
  );
};

export default LastScreen;
