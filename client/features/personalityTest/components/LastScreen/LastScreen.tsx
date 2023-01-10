import React from 'react';
import { ResultItems } from '../../personalityTest.types';
import {
  Container,
  Content,
  ContentWrapper,
  RestartButton,
  Title,
  TitleWrapper,
} from './LastScreen.style';

interface LastScreenProps {
  items: ResultItems;
  onClick: () => void;
}

const LastScreen = ({ items, onClick }: LastScreenProps): JSX.Element => {
  const { typeContent, explanationContent } = items;

  return (
    <Container>
      <TitleWrapper>
        <Title>{typeContent}</Title>
      </TitleWrapper>
      <ContentWrapper>
        <Content> {explanationContent}</Content>
      </ContentWrapper>
      <RestartButton onClick={onClick} />
    </Container>
  );
};

export default LastScreen;
