import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Header = dynamic(() => import('../Header/Header'), {
  ssr: true,
});

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
