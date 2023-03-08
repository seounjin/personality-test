import {
  Wrapper,
  Headline,
  SubTitle,
  ButtonWrapper,
} from './StartScreen.style';
import Image from 'next/image';
import OvalButton from '../OvalButton/OvalButton';

interface EntranceProps {
  title: string;
  subTitle: string;
  onClick: () => void;
}

const StartScreen = ({
  title,
  subTitle,
  onClick,
}: EntranceProps): JSX.Element => {
  return (
    <Wrapper>
      <SubTitle>{subTitle}</SubTitle>
      <Headline>{title}</Headline>
      <Image
        alt="poster-img"
        src="/images/rabbit.png"
        width={118}
        height={221}
        loader={({ src }) => src}
        priority
      />
      <ButtonWrapper>
        <OvalButton text={'테스트 시작하기'} onClick={onClick} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default StartScreen;
