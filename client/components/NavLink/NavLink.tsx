import React, { ReactNode } from 'react';
import { Wrapper } from './NavLink.style';

export interface NavLinkProps {
  isActive: boolean;
  children: ReactNode;
}

export const NavLink = ({ isActive, children }: NavLinkProps): JSX.Element => {
  return <Wrapper isActive={isActive}>{children}</Wrapper>;
};
