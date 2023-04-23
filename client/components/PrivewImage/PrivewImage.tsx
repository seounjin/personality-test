import React from 'react';
import Image from 'next/image';

interface PrivewImageProps {
  imgUrl: string;
}

const PrivewImage = ({ imgUrl }: PrivewImageProps): JSX.Element => {
  return (
    <Image
      alt={'preview-img'}
      width={229}
      height={222}
      src={imgUrl}
      style={{ objectFit: 'cover' }}
    />
  );
};

export default PrivewImage;
