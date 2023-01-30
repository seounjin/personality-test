import React from 'react';
import { Wrapper, QuestionIcon } from './QuestionMarkButton.style';

interface QuestionMarkButtonProps {
  onClick: () => void;
}

const QuestionMarkButton = ({
  onClick,
}: QuestionMarkButtonProps): JSX.Element => {
  return (
    <Wrapper onClick={onClick} type="button">
      <QuestionIcon />
    </Wrapper>
  );
};

export default QuestionMarkButton;
