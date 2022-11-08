import React from 'react';
import Wrapper from './styles';
import ReadForm from '../../ReadForm/ReadForm';
import { ResultItem, ResultContent } from '../type';

interface ResultContentProps {
  item: ResultItem[];
  index: number;
  resultContent: ResultContent;
  handleTextArea: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ResultContent = ({
  item,
  index,
  resultContent,
  handleTextArea,
}: ResultContentProps): JSX.Element => {
  return (
    <Wrapper>
      <div className="result_content_container">
        <ReadForm item={item} />

        <div className="result_content_wrapper">
          <label>당신은?</label>
          <input
            data-index={index}
            name="who"
            onChange={handleTextArea}
            defaultValue={resultContent ? resultContent.who : ''}
          />
          <label>설명</label>
          <textarea
            name="content"
            data-index={index}
            onChange={handleTextArea}
            defaultValue={resultContent ? resultContent.content : ''}
          ></textarea>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(ResultContent);
