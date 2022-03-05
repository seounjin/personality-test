import React from 'react';
import Wrapper from './styles';
import BackgroundImg from '../../BackgroundImg';
import WindowCharacter from './WindowCharacter';

interface LastScreenData {
  who: string;
  content: string;
}

interface LastScreenProps {
  lastScreenData: LastScreenData;
  handleReStartClick: () => void;
}

const LastScreen = ({
  lastScreenData,
  handleReStartClick,
}: LastScreenProps): JSX.Element => {
  const { who, content } = lastScreenData;

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
