import React, { ReactNode } from 'react';
import { Container } from './WeightedScoreBoardSection.style';

interface WeightedScoreBoardSectionProps {
  children: ReactNode;
}

const WeightedScoreBoardSection = ({
  children,
}: WeightedScoreBoardSectionProps): JSX.Element => {
  return <Container>{children}</Container>;
};

export default WeightedScoreBoardSection;
