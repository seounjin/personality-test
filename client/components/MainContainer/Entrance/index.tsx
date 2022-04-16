import BackgroundImg from '../../BackgroundImg';
import Wrapper from './styles';

interface EntranceProps {
  title: string;
  handleStartClick: () => void;
}

const Entrance = ({ title, handleStartClick }: EntranceProps): JSX.Element => {
  return (
    <BackgroundImg>
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
