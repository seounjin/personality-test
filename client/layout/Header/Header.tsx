import BackButton from '../../components/BackButton/BackButton';
import BarsMenu from '../../components/BarsMenu/BarsMenu';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import MobileLogo from '../../components/MobileLogo/MobileLogo';
import RightMenu from '../../components/RightMenu/RightMenu';
import { Container, Nav } from './Header.style';

const Header = (): JSX.Element => {
  return (
    <Container>
      <Nav>
        <BackButton />
        <LeftMenu />

        <MobileLogo />

        <RightMenu />
        <BarsMenu />
      </Nav>
    </Container>
  );
};

export default Header;
