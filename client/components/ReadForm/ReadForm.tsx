import React from 'react';
import useParseItem from '../../hooks/useParseItem';
import _mapObject from '../../utils/_mapObject';
import { SelectItem } from '../SelectCard/SelectCard.type';
import {
  Wrapper,
  Container,
  TitleWrapper,
  Title,
  ContentWrapper,
  Content,
} from './ReadForm.style';

interface ReadFormProps {
  item: SelectItem[];
  selectIndex: number;
}

const ReadForm = ({ item, selectIndex }: ReadFormProps): JSX.Element => {
  const readItem = useParseItem({ item, index: selectIndex });

  return (
    <Wrapper>
      {readItem.map(({ label, defaultValue }, index) => {
        return (
          <Container key={`r${index}`}>
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
