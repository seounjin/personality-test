import React from 'react';
import Wrapper from './styles';

interface BackgroundImgProps {
  children: React.ReactNode;
  height: string;
}

const BackgroundImg = ({
  children,
  height,
}: BackgroundImgProps): JSX.Element => {
  return <Wrapper height={height}>{children}</Wrapper>;
};

export default BackgroundImg;
