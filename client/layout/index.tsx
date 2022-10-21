import Header from './Header/Header';

const Layout = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
