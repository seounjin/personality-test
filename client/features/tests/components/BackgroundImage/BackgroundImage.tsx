import React from 'react';
import Wrapper from './BackgroundImage.style';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage = ({ children }: BackgroundImageProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};

export default BackgroundImage;
