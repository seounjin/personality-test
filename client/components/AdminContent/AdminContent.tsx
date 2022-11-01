import React from 'react';
import { Container, SubTitle } from './AdminContent.style';

interface AdminContentProps {
  subtitle: string;
  children: React.ReactNode;
}

const AdminContent = ({
  subtitle,
  children,
}: AdminContentProps): JSX.Element => {
  return (
    <Container>
      <SubTitle>{subtitle}</SubTitle>
      {children}
    </Container>
  );
};

export default AdminContent;
