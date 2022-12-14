import React from 'react';
import {
  LeftArrowIcon,
  Button,
  Input,
  RightArrowIcon,
  Wrapper,
  Container,
  Label,
} from './SetCounterButton.style';

interface SetCounterButtonProps {
  label: string;
  count: number;
  minCount: number;
  maxCount: number;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const SetCounterButton = ({
  label,
  count,
  minCount,
  maxCount,
  onLeftButtonClick,
  onRightButtonClick,
}: SetCounterButtonProps): JSX.Element => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Button onClick={onLeftButtonClick} disabled={count === minCount}>
          <LeftArrowIcon $isDisabled={count === minCount} />
        </Button>
        <Input value={count} disabled />
        <Button onClick={onRightButtonClick} disabled={count === maxCount}>
          <RightArrowIcon $isDisabled={count === maxCount} />
        </Button>
      </Container>
    </Wrapper>
  );
};

export default SetCounterButton;
