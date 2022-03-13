import React from 'react';
import Wrapper from './styles';
import { ResultItems } from '../../SelectContainer/type';

interface ResultContentProps {
  item: ResultItems[];
  index: number;
  handleTextArea: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ResultContent = ({
  item,
  index,
  handleTextArea,
}: ResultContentProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="result_content_container">
        {item.map((data, index) => {
          const { questionNumber, selectNumber, question, content } = data;
          return (
            <div className="result_content_wrapper" key={'resContent' + index}>
              <label> {questionNumber + '번질문에 대한'} </label>
              <p> {question} </p>

              <label> {selectNumber + '번 선택함'} </label>
              <p>{content}</p>
            </div>
          );
        })}

        <div className="result_content_wrapper">
          <label>당신은?</label>
          <input data-index={index} name="who" onChange={handleTextArea} />
          <label>설명</label>
          <textarea
            name="content"
            data-index={index}
            onChange={handleTextArea}
          ></textarea>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(ResultContent);
