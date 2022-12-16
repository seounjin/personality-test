import React from 'react';
import {
  BoardContainer,
  BoardWrapper,
  Board,
  Label,
  Span,
  BoardItemWrapper,
} from './WeightedBoard.style';

interface Dictionary {
  [key: string]: string;
}

interface WeightedBoardProps {
  items: Array<string>;
  dictionary: Dictionary;
}

const WeightedBoard = ({
  items,
  dictionary,
}: WeightedBoardProps): JSX.Element => {
  return (
    <BoardContainer>
      {items.map((type, index) => (
        <BoardWrapper key={`b${index}`}>
          <Board>
            <BoardItemWrapper>
              <Label>{type}</Label>
            </BoardItemWrapper>
            <BoardItemWrapper>
              <Span>{dictionary[type]}</Span>
            </BoardItemWrapper>
          </Board>
        </BoardWrapper>
      ))}
    </BoardContainer>
  );
};

export default WeightedBoard;
