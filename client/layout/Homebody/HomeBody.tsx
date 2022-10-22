import React from 'react';
import { Container } from './Homebody.stlye';

interface HomeBodyProps {
  children: React.ReactNode;
}

const HomeBody = ({ children }: HomeBodyProps) => {
  return <Container>{children}</Container>;
};

export default HomeBody;
