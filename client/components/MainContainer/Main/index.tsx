import React from 'react';
import Wrapper from './styles';

interface MainProps {
  CurrentIndex: number;
  opacity: number;
  question: string;
  select_1: string;
  select_2: string;
  handleButtonClick: (event) => void;
}

const Main = ({
  CurrentIndex,
  opacity,
  question,
  select_1,
  select_2,
  handleButtonClick,
}: MainProps): JSX.Element => {
  return (
    <Wrapper className="mbti-wrapper" opacity={opacity}>
      <div className="question-wrapper">
        <div className="question">{question}</div>
      </div>

      <div className="button-wrapper">
        <button
          className="select-button-1"
          data-id="1"
          onClick={handleButtonClick}
        >
          {select_1}
        </button>

        <button
          className="select-button-2"
          data-id="2"
          onClick={handleButtonClick}
        >
          {select_2}
        </button>
      </div>
    </Wrapper>
  );
};

export default Main;
