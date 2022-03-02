import React from 'react';
import Wrapper from './styles';
import BackgroundImg from '../../BackgroundImg';

interface EntranceProps {
  handleStartClick: () => void;
}

const Entrance = ({ handleStartClick }: EntranceProps): JSX.Element => {
  return (
    <BackgroundImg height={'668px'}>
      <Wrapper>
        <div>당신의 축구성향은?</div>
        <img className="poster-img" src="/poster.png"></img>
        <button className="start-button-img" onClick={handleStartClick}>
          테스트 시작하기
        </button>
      </Wrapper>
    </BackgroundImg>
  );
};

export default Entrance;
