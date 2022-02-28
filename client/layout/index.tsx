import Wrapper from './styles';
import Header from './Header';

const Layout = ({ children }): JSX.Element => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
