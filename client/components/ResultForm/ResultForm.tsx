import React from 'react';
import {
  Container,
  ContentContainer,
  Label,
  Input,
  Textarea,
} from './ResultForm.style';
import ReadForm from '../ReadForm/ReadForm';
import { ResultItem, ResultContent } from '../ResultCard/ResultCard.type';

const MReadForm = React.memo(ReadForm);

interface ResultFormProps {
  item: ResultItem[];
  index: number;
  content: ResultContent;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ResultForm = ({
  item,
  index,
  content,
  onChange,
}: ResultFormProps): JSX.Element => {
  return (
    <Container>
      <MReadForm item={item} />
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
