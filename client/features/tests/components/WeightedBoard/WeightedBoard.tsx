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

const WeightedBoard = (): JSX.Element => {
  const { typeFormItems, typeDictionary } = useSelector(
    (state: RootState) => ({
      typeFormItems: state.tests.typeFormItems,
      typeDictionary: state.tests.typeDictionary,
    }),
    shallowEqual,
  );

  return (
    <BoardContainer>
      {typeFormItems.map(({ typeContent }, index) => (
        <BoardWrapper key={`b${index}`}>
          <Board>
            <BoardItemWrapper>
              <Label>{typeContent}</Label>
            </BoardItemWrapper>
            <BoardItemWrapper>
              <Span>{typeDictionary[typeContent]}</Span>
            </BoardItemWrapper>
          </Board>
        </BoardWrapper>
      ))}
    </BoardContainer>
  );
};

export default WeightedBoard;
