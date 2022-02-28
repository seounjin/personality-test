import React from 'react';
import Wrapper from './styles';
import ResultContent from './ResultContent';
import { ResultItems } from '../SelectContainer/type';

interface ResultProps {
  resultItems: Array<ResultItems>[];
  handleTextArea: (event: any) => void;
}

const ResultContainer = ({
  resultItems,
  handleTextArea,
}: ResultProps): JSX.Element => {
  return (
    <Wrapper>
      {resultItems.map((data, index) => {
        return (
          <ResultContent
            key={'resultItems' + index}
            item={data}
            index={index}
            handleTextArea={handleTextArea}
          ></ResultContent>
        );
      })}
    </Wrapper>
  );
};

export default ResultContainer;
// export default React.memo(ResultContainer);
