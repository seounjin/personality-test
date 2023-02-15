import React from 'react';
import { Wrapper, P } from './PhraseText.style';

interface PhraseTextProps {
  text: string;
}

const PhraseText = ({ text }: PhraseTextProps): JSX.Element => {
  return (
    <Wrapper>
      <P>{text}</P>
    </Wrapper>
  );
};

export default PhraseText;
