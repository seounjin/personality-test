import { ReactNode } from 'react';
import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
