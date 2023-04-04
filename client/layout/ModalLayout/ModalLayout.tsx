import React, { ReactNode } from 'react';
import { Wrapper } from './ModalLayout.style';

interface ModalLayoutProps {
  children: ReactNode;
}

const ModalLayout = ({ children }: ModalLayoutProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};

export default ModalLayout;
