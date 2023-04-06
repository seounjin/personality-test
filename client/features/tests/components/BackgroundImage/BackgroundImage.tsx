import React from 'react';
import Wrapper from './BackgroundImage.style';
import { forwardRef } from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage = forwardRef<HTMLDivElement, BackgroundImageProps>(
  ({ children }, ref?): JSX.Element => {
    return <Wrapper ref={ref}>{children}</Wrapper>;
  },
);

BackgroundImage.displayName = 'BackgroundImage';

export default BackgroundImage;
