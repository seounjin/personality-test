import { Wrapper, Button, Headline } from './StartScreen.style';
import Image from 'next/image';

interface EntranceProps {
  title: string;
  onClick: () => void;
}

const StartScreen = ({ title, onClick }: EntranceProps): JSX.Element => {
  return (
    <Wrapper>
      <Headline>{title}</Headline>
      <Image alt="poster-img" src="/poster.png" width={250} height={250} />
      <Button onClick={onClick}>테스트 시작하기</Button>
    </Wrapper>
  );
};

export default StartScreen;
