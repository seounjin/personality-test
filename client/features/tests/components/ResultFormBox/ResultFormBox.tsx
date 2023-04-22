import React, { ReactNode } from 'react';
import { Container, NumberLabel } from './ResultFormBox.style';

interface ResultFormBoxProps {
  children: ReactNode;
  numberling: string;
}

const ResultFormBox = ({
  children,
  numberling,
}: ResultFormBoxProps): JSX.Element => {
  return (
    <Container>
      <NumberLabel>{numberling}</NumberLabel>
      {children}
    </Container>
  );
};

export default ResultFormBox;
