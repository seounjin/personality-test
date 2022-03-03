import React from 'react';
import Wrapper from './styles';
import BackgroundImg from '../../BackgroundImg';
import WindowCharacter from './WindowCharacter';
import { lastScreenProps } from './types';

const LastScreen = ({ LastScreenData, handleReStartClick }): JSX.Element => {
  const { who, content } = LastScreenData;

  return (
    <BackgroundImg height={'100%'}>
      <Wrapper>
        <div className="result-name">
          <span>{who}</span>
        </div>

        <WindowCharacter description={content}></WindowCharacter>

        <button
          className="restart-button"
          onClick={handleReStartClick}
        ></button>
      </Wrapper>
    </BackgroundImg>
  );
};

export default LastScreen;
