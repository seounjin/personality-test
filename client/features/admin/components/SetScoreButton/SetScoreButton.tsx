import React from 'react';
import {
  Button,
  Wrapper,
  Container,
  LeftMinusIcon,
  RightPlusIcon,
  Score,
  ScoreWrapper,
} from './SetScoreButton.style';

interface SetScoreButtonProps {
  score: number;
  minScore: number;
  maxScore: number;
  onLeftButtonClick: (...props) => void;
  onRightButtonClick: (...props) => void;
}

const SetScoreButton = ({
  score,
  minScore,
  maxScore,
  onLeftButtonClick,
  onRightButtonClick,
}: SetScoreButtonProps) => {
  return (
    <Wrapper>
      <Container>
        <Button
          type="button"
          onClick={onLeftButtonClick}
          disabled={score === minScore}
        >
          <LeftMinusIcon $isDisabled={score === minScore} />
        </Button>
        <ScoreWrapper>
          <Score>{score}</Score>
        </ScoreWrapper>
        <Button
          type="button"
          onClick={onRightButtonClick}
          disabled={score === maxScore}
        >
          <RightPlusIcon $isDisabled={score === maxScore} />
        </Button>
      </Container>
    </Wrapper>
  );
};

export default SetScoreButton;
