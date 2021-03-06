import React from 'react';
import Wrapper from './styles';
import SelectForm from '../../SelectContainer/SelectForm';
import { ResultContents, ResultItems } from '../../SelectContainer/type';

interface ResultContentProps {
  item: ResultItems[];
  index: number;
  resultContent: ResultContents;
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
        <SelectForm item={item}></SelectForm>

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
