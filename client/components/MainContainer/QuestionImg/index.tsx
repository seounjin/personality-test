import React from 'react';
import BackgroundImg from '../../BackgroundImg';
import Wrapper from './styles';

const QuestionImg = ({ children }): JSX.Element => (
  <BackgroundImg>
    <Wrapper>{children}</Wrapper>
  </BackgroundImg>
);

export default QuestionImg;
