import React from 'react';
import Wrapper from './styles';

const BackgroundImg = ({ children, height }): JSX.Element => {
  return <Wrapper height={height}>{children}</Wrapper>;
};

export default BackgroundImg;
