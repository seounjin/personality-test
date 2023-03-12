import React from 'react';
import {
  Content,
  Headline,
  NextImage,
  NextImageWrapper,
  Text,
  Button,
} from './TestTypeButton.style';

interface TestTypeButtonProps {
  title: string;
  text: string;
  imgSrc: string;
  testType: string;
  onClick: (testType: string) => void;
}

const TestTypeButton = ({
  title,
  text,
  onClick,
  imgSrc,
  testType,
}: TestTypeButtonProps): JSX.Element => {
  return (
    <Button onClick={() => onClick(testType)}>
      <NextImageWrapper>
        <NextImage alt="card-img" src={imgSrc} fill priority />
      </NextImageWrapper>
      <Content>
        <Headline>{title}</Headline>
        <Text>{text}</Text>
      </Content>
    </Button>
  );
};

export default TestTypeButton;
