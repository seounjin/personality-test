import React, { ReactNode } from 'react';
import { Wrapper } from './ShadeScreen.style';

interface ShadeScreenProps {
  children: ReactNode;
}

export const ShadeScreen = ({ children }: ShadeScreenProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};
