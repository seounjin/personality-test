import React from 'react';
import Wrapper from './styles';

interface BackgroundImgProps {
  children: React.ReactNode;
}

const BackgroundImg = ({ children }: BackgroundImgProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};

export default BackgroundImg;
