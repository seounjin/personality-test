import React from 'react';
import Wrapper from './styles';
import ResultContent from './ResultContent';
import { ResultContents, ResultItems } from '../SelectContainer/type';

interface ResultProps {
  resultItems: Array<ResultItems>[];
  resultContents?: ResultContents[];
  handleTextArea: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ResultContainer = ({
  resultItems,
  resultContents,
  handleTextArea,
}: ResultProps): JSX.Element => {
  return (
    <Wrapper>
      {resultItems.map((data, index) => {
        return (
          <ResultContent
            key={'resultItems' + index}
            item={data[0] as unknown as ResultItems[]}
            index={index}
            resultContent={resultContents && resultContents[index]}
            handleTextArea={handleTextArea}
          ></ResultContent>
        );
      })}
    </Wrapper>
  );
};

export default ResultContainer;
// export default React.memo(ResultContainer);
