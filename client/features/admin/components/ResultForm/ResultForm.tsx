import React from 'react';
import {
  Container,
  ContentContainer,
  Label,
  Input,
  Textarea,
  HeaderContainer,
  P,
  ShadowBox,
} from './ResultForm.style';
import { ResultContent } from '../../container/ResultCard/ResultCard.type';
import { InputForm } from '../../../../components/InputForm/InputForm.type';

interface ResultFormProps {
  items: InputForm[][];
  index: number;
  content: ResultContent;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ResultForm = ({
  items,
  index,
  content,
  onChange,
}: ResultFormProps): JSX.Element => {
  return (
    <Container>
      {items.map((item) => {
        return item.map(({ label, defaultValue }, index) => (
          <HeaderContainer key={`r${index}`}>
            <Label>{label}</Label>
            <ShadowBox>
              <P>{defaultValue}</P>
            </ShadowBox>
          </HeaderContainer>
        ));
      })}

      <ContentContainer>
        <Label>당신은?</Label>
        <Input
          data-index={index}
          name="who"
          onChange={onChange}
          defaultValue={content ? content.who : ''}
        />
        <Label>설명</Label>
        <Textarea
          name="content"
          data-index={index}
          onChange={onChange}
          defaultValue={content ? content.content : ''}
        />
      </ContentContainer>
    </Container>
  );
};

export default ResultForm;
