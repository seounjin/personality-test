import React from 'react';
import { WeightedScoreItem } from '../../container/SetSelectFormItems/SetSelectFormItems.type';
import {
  LabelWrapper,
  Label,
} from '../../container/SetWeightSection/SetWeightSection.style';
import {
  Container,
  Score,
  ScoreWrapper,
  Wrapper,
} from './WeightedScoreBoard.style';

interface WeightedScoreBoardProps {
  items: WeightedScoreItem[];
}

const WeightedScoreBoard = ({
  items,
}: WeightedScoreBoardProps): JSX.Element => {
  return (
    <Wrapper>
      {items.map(({ typeContent, score }, index) => (
        <Container key={`w${index}`}>
          <LabelWrapper>
            <Label>{typeContent}</Label>
          </LabelWrapper>
          <ScoreWrapper>
            <Score>{`${score} 점`}</Score>
          </ScoreWrapper>
        </Container>
      ))}
    </Wrapper>
  );
};

export default WeightedScoreBoard;
