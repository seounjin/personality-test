import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../../components/Logo/Logo';
import { Container, Nav, NavLink } from './Header.style';

const ROUTES = [
  { id: 'n1', url: '/', content: '성향 테스트', pathName: '/' },
  {
    id: 'n2',
    url: '/admin',
    content: '성향 테스트 만들기',
    pathName: '/admin',
  },
];

const Header = (): JSX.Element => {
  const router = useRouter();

  return (
    <Container>
      <Nav>
        <Logo />
        {ROUTES.map((data) => {
          return (
            <NavLink key={data.id} isActive={router.pathname === data.pathName}>
              <Link href={data.url}>{data.content}</Link>
            </NavLink>
          );
        })}
      </Nav>
    </Container>
  );
};

export default Header;
