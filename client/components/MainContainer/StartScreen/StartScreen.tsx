import BackgroundImage from '../../BackgroundImage/BackgroundImage';
import { Wrapper, Button, Headline } from './StartScreen.style';
import Image from 'next/image';

interface EntranceProps {
  title: string;
  handleStartClick: () => void;
}

const StartScreen = ({
  title,
  handleStartClick,
}: EntranceProps): JSX.Element => {
  return (
    <BackgroundImage>
      <Wrapper>
        <Headline>{title}</Headline>
        <Image
          alt="poster-img"
          src="/poster.png"
          width="250px"
          height="250px"
        />
        <Button onClick={handleStartClick}>테스트 시작하기</Button>
      </Wrapper>
    </BackgroundImage>
  );
};

export default StartScreen;
