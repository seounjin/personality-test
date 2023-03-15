import React from 'react';
import { Img } from './PrivewImage.style';

interface PrivewImageProps {
  imgUrl: string;
}

const PrivewImage = ({ imgUrl }: PrivewImageProps): JSX.Element => {
  return <Img alt={'preview-img'} src={imgUrl} />;
};

export default PrivewImage;
