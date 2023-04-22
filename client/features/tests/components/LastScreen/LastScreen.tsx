import { useRouter } from 'next/router';
import React from 'react';
import PrivewImage from '../../../../components/PrivewImage/PrivewImage';
import { IMAGE_HOLDER_PATH } from '../../tests.const';
import OvalButton from '../OvalButton/OvalButton';
import {
  ButtonWrapper,
  Container,
  Content,
  Title,
  ContentWrapper,
  PrivewImageWrapper,
} from './LastScreen.style';

interface LastScreenProps {
  resultContent: string;
  explanationContent: string;
  resultImageUrl?: string;
  subTitle?: string;
  isPublic: boolean;
  onClick: () => void;
  onClose?: () => void;
}

const LastScreen = ({
  resultContent,
  explanationContent,
  resultImageUrl,
  subTitle,
  isPublic,
  onClick,
  onClose,
}: LastScreenProps): JSX.Element => {
  const router = useRouter();

  const copyUrl = () => {
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
      {resultImageUrl !== IMAGE_HOLDER_PATH && (
        <PrivewImageWrapper>
          <PrivewImage imgUrl={resultImageUrl} />
        </PrivewImageWrapper>
      )}
      <ContentWrapper>
        <Content> {explanationContent}</Content>
      </ContentWrapper>
      <ButtonWrapper>
        {isPublic && (
          <OvalButton
            text={'공유하기'}
            ariaLabel={'공유하기 버튼'}
            onClick={copyUrl}
          />
        )}
        <OvalButton
          text={'테스트 다시하기'}
          ariaLabel={'테스트 다시하기 버튼'}
          onClick={onClick}
        />
        {onClose && (
          <OvalButton
            text={'나가기'}
            ariaLabel={'나가기 버튼'}
            onClick={onClose}
          />
        )}
        {!onClose ? (
          <OvalButton
            text={'홈으로'}
            ariaLabel={'홈 버튼'}
            onClick={() => router.push('/')}
          />
        ) : null}
      </ButtonWrapper>
    </Container>
  );
};

export default LastScreen;
