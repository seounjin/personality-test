import { useRouter } from 'next/router';
import BackgroundImg from '../../BackgroundImg';
import Wrapper from './styles';

interface EntranceProps {
  handleStartClick: () => void;
}

const Entrance = ({ handleStartClick }: EntranceProps): JSX.Element => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <BackgroundImg height={'668px'}>
      <Wrapper>
        <div>{title}</div>
        <img className="poster-img" src="/poster.png"></img>
        <button className="start-button-img" onClick={handleStartClick}>
          테스트 시작하기
        </button>
      </Wrapper>
    </BackgroundImg>
  );
};

export default Entrance;
