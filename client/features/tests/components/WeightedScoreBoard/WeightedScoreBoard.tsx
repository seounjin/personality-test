import React from 'react';
// import { WeightedScoreItem } from '../../container/SetSelectFormItems/SetSelectFormItems.type';
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
  items: any;
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
