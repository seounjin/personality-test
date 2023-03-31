import React from 'react';
import { TEST_TYPE_DATA } from '../../tests.const';
import {
  Content,
  Headline,
  NextImage,
  NextImageWrapper,
  Text,
  Button,
  Wrapper,
} from './TestTypeButtons.style';

interface TestTypeButtonsProps {
  onClick: (testType: string) => void;
}

const TestTypeButtons = ({ onClick }: TestTypeButtonsProps): JSX.Element => {
  return (
    <>
      {TEST_TYPE_DATA.map(({ id, title, text, imgSrc, testType }) => (
        <Wrapper key={id}>
          <Button onClick={() => onClick(testType)}>
            <NextImageWrapper>
              <NextImage alt="card-img" src={imgSrc} fill priority />
            </NextImageWrapper>
            <Content>
              <Headline>{title}</Headline>
              <Text>{text}</Text>
            </Content>
          </Button>
        </Wrapper>
      ))}
    </>
  );
};

export default TestTypeButtons;
