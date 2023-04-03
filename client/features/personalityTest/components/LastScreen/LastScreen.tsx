import React from 'react';
import OvalButton from '../OvalButton/OvalButton';
import {
  ButtonWrapper,
  Container,
  Content,
  Title,
  ContentWrapper,
} from './LastScreen.style';

interface LastScreenProps {
  resultContent: string;
  explanationContent: string;
  subTitle?: string;
  isPublic: boolean;
  onClick: () => void;
}

const LastScreen = ({
  resultContent,
  explanationContent,
  subTitle,
  isPublic,
  onClick,
}: LastScreenProps): JSX.Element => {
  const copyURL = () => {
    const currentUrl = window.document.location.href;
    const text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = currentUrl;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);

    alert('링크가 복사되었습니다.');
  };

  return (
    <Container>
      <Title>
        {resultContent}
        {subTitle && `(${subTitle})`}
      </Title>
      <ContentWrapper>
        <Content> {explanationContent}</Content>
      </ContentWrapper>
      <ButtonWrapper>
        {isPublic && <OvalButton text={'공유하기'} onClick={copyURL} />}
        <OvalButton text={'테스트 다시하기'} onClick={onClick} />
        <OvalButton text={'나가기'} onClick={() => window.close()} />
      </ButtonWrapper>
    </Container>
  );
};

export default LastScreen;
