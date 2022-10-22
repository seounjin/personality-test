import React from 'react';
import { Container } from './HomeBody.stlye';

interface HomeBodyProps {
  children: React.ReactNode;
}

const HomeBody = ({ children }: HomeBodyProps) => {
  return <Container>{children}</Container>;
};

export default HomeBody;
