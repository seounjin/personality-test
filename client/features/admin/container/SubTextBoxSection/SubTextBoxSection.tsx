import React, { ReactNode } from 'react';
import { Container } from './SubTextBoxSection.style';

interface SubTextBoxSectionProps {
  children: ReactNode;
}

const SubTextBoxSection = ({
  children,
}: SubTextBoxSectionProps): JSX.Element => {
  return <Container>{children}</Container>;
};

export default SubTextBoxSection;
