import React from 'react';
import {
  LabelWrapper,
  Label,
} from '../../container/SetWeightSection/SetWeightSection.style';
import { WeightedScoreItem } from '../../tests.types';
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
      {items.map(({ resultContent, score }, index) => (
        <Container key={`w${index}`}>
          <LabelWrapper>
            <Label>{resultContent}</Label>
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
