import React from 'react';
import { Container } from './AdminContent.style';

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent = ({ children }: AdminContentProps): JSX.Element => {
  return <Container>{children}</Container>;
};

export default AdminContent;
