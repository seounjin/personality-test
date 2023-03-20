import React, { useState } from 'react';
import { SelectedOption } from '../../container/TrueOrFalseResultFormSection/TrueOrFalseResultFormSection.type';
import SelectedOptionContent from '../SelectedOptionContent/SelectedOptionContent';
import {
  ArrowRightIcon,
  ArrowRightIconWrapper,
  OptionText,
  QuestionText,
  TextArea,
  Container,
  Wrapper,
  DeatilButton,
  HeadLine,
  HeadBar,
  ArrowDownIcon,
} from './SelectedOptionsTable.style';

interface SelectedOptionsTableProps {
  selectedOption: SelectedOption[];
}

const SelectedOptionsTable = ({
  selectedOption,
}: SelectedOptionsTableProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDetailButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <HeadBar>
        <HeadLine>선택한 옵션</HeadLine>
        <DeatilButton
          isOpen={isOpen}
          type="button"
          onClick={handleDetailButton}
        >
          상세보기
        </DeatilButton>
      </HeadBar>
      <Wrapper isOpen={isOpen}>
        {selectedOption.map(
          ({ qusetionNumber, question, optionNumber, option }, index) => (
            <React.Fragment key={`s${index}`}>
              {!isOpen ? (
                <TextArea>
                  <QuestionText>{`${qusetionNumber}번 질문`}</QuestionText>
                  <OptionText>{`${optionNumber}번 선택`}</OptionText>
                </TextArea>
              ) : (
                <SelectedOptionContent
                  qusetionNumber={qusetionNumber}
                  question={question}
                  optionNumber={optionNumber}
                  option={option}
                />
              )}

              {selectedOption.length !== 0 &&
                index !== selectedOption.length - 1 && (
                  <ArrowRightIconWrapper>
                    {!isOpen ? <ArrowRightIcon /> : <ArrowDownIcon />}
                  </ArrowRightIconWrapper>
                )}
            </React.Fragment>
          ),
        )}
      </Wrapper>
    </Container>
  );
};

export default SelectedOptionsTable;
