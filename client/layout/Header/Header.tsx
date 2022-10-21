import Link from 'next/link';
import { Container, Nav, NavContent } from './Header.style';

const NAV_CONTENT = [
  { id: 'n1', url: '/', content: 'LoGo' },
  { id: 'n2', url: '/', content: '성향 테스트' },
  { id: 'n3', url: '/admin', content: '성향 테스트 만들기' },
];

const Header = (): JSX.Element => {
  return (
    <Container>
      <Nav>
        {NAV_CONTENT.map((data) => {
          return (
            <NavContent key={data.id}>
              <Link href={data.url}>{data.content}</Link>
            </NavContent>
          );
        })}
      </Nav>
    </Container>
  );
};

export default Header;
