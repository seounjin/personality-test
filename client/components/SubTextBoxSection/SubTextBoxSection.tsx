import React, { ReactNode } from 'react';
import { Wrapper } from './SubTextBoxSection.style';

interface SubTextBoxSectionProps {
  children: ReactNode;
}

const SubTextBoxSection = ({
  children,
}: SubTextBoxSectionProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>;
};

export default SubTextBoxSection;
