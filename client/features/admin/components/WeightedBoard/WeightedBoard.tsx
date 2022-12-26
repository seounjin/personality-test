import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../../../store/modules';
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
  const { typeDictionary } = useSelector(
    (state: RootState) => ({
      typeList: state.admin.typeList,
      typeDictionary: state.admin.typeDictionary,
    }),
    shallowEqual,
  );

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
