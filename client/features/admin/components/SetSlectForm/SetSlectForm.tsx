import React from 'react';
import {
  LeftArrowIcon,
  Button,
  Input,
  RightArrowIcon,
  Wrapper,
  Container,
  Label,
} from './SetSlectForm.style';

interface SetSlectFormProps {
  label: string;
  value: number;
  minValue: number;
  maxValue: number;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const SetSlectForm = ({
  label,
  value,
  minValue,
  maxValue,
  onLeftButtonClick,
  onRightButtonClick,
}: SetSlectFormProps): JSX.Element => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Button onClick={onLeftButtonClick} disabled={value === minValue}>
          <LeftArrowIcon $isDisabled={value === minValue} />
        </Button>
        <Input value={value} disabled />
        <Button onClick={onRightButtonClick} disabled={value === maxValue}>
          <RightArrowIcon $isDisabled={value === maxValue} />
        </Button>
      </Container>
    </Wrapper>
  );
};

export default SetSlectForm;
