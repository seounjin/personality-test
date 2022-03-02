import React from 'react';
import Wrapper from './styles';
import BackgroundImg from '../../BackgroundImg';
import WindowCharacter from './WindowCharacter';
import { lastScreenProps } from './types';

const LastScreen = ({ LastScreenData, handleReStartClick }): JSX.Element => {
  const { description } = LastScreenData;

  return (
    <BackgroundImg height={'100%'}>
      <Wrapper>
        <div className="result-name">
          <span>당신은 우리흥~~~~~~우리흥!</span>
        </div>

        <WindowCharacter description={description}></WindowCharacter>

        <button
          className="restart-button"
          onClick={handleReStartClick}
        ></button>
      </Wrapper>
    </BackgroundImg>
  );
};

export default LastScreen;
