import React from 'react';
import {
  Wrapper,
  Container,
  TitleWrapper,
  Title,
  ContentWrapper,
  Content,
} from './ReadForm.style';

interface Item {
  label: string;
  defaultValue: string;
}

interface ReadFormProps {
  item: Item[];
}

const ReadForm = ({ item }: ReadFormProps): JSX.Element => {
  return (
    <Wrapper>
      {item.map(({ label, defaultValue }) => {
        return (
          <Container key={label}>
            <TitleWrapper>
              <Title>{label}</Title>
            </TitleWrapper>

            <ContentWrapper>
              <Content>{defaultValue}</Content>
            </ContentWrapper>
          </Container>
        );
      })}
    </Wrapper>
  );
};

export default ReadForm;
