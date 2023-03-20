import React from 'react';
import {
  Wrapper,
  Content,
  BoldText,
  Text,
} from './SelectedOptionContent.style';

interface SelectedOptionProps {
  qusetionNumber: number;
  question: string;
  optionNumber: number;
  option: string;
}
const SelectedOptionContent = ({
  qusetionNumber,
  question,
  optionNumber,
  option,
}: SelectedOptionProps): JSX.Element => {
  return (
    <Wrapper>
      <Content>
        <BoldText>{`${qusetionNumber}번 질문`}</BoldText>
        <Text>{question}</Text>

        <BoldText>{`${optionNumber}번 선택`}</BoldText>
        <Text>{option}</Text>
      </Content>
    </Wrapper>
  );
};

export default SelectedOptionContent;
