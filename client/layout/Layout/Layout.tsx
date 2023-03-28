import dynamic from 'next/dynamic';
import { ReactNode, Suspense } from 'react';
// import Header from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

const Header = dynamic(() => import('../Header/Header'), {
  ssr: true,
});

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Suspense
        fallback={
          <div>
            loading...loading...loading...loading...loading...loading...loading...
          </div>
        }
      >
        <Header />
      </Suspense>
      {children}
    </>
  );
};

export default Layout;
