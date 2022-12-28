import React from 'react';
import { useWatch } from 'react-hook-form';
import {
  BoardContainer,
  BoardWrapper,
  Board,
  Label,
  Span,
  BoardItemWrapper,
} from './WeightedBoard.style';

interface WeightedBoardProps {
  items: Array<string>;
}

const WeightedBoard = ({ items }: WeightedBoardProps): JSX.Element => {
  const typeDictionary = useWatch({
    name: 'typesDictionary',
  });

  return (
    <BoardContainer>
      {items.map((type, index) => (
        <BoardWrapper key={`b${index}`}>
          <Board>
            <BoardItemWrapper>
              <Label>{type}</Label>
            </BoardItemWrapper>
            <BoardItemWrapper>
              <Span>{typeDictionary[type]}</Span>
            </BoardItemWrapper>
          </Board>
        </BoardWrapper>
      ))}
    </BoardContainer>
  );
};

export default WeightedBoard;
