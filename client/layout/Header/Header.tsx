import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginModal from '../../components/LoginModal/LoginModal';
import Logo from '../../components/Logo/Logo';
import Modal from '../../components/Modal/Modal';
import { Container, LeftMenu, LoginButton, Nav, NavLink } from './Header.style';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <Nav>
        <LeftMenu>
          <Logo />

          {ROUTES.map((data) => {
            return (
              <NavLink
                key={data.id}
                isActive={router.pathname === data.pathName}
              >
                <Link href={data.url}>{data.content}</Link>
              </NavLink>
            );
          })}
        </LeftMenu>
        <NavLink isActive={true}>
          <LoginButton onClick={handleModal}>로그인</LoginButton>
        </NavLink>
      </Nav>

      {isModalOpen && (
        <Modal onClose={handleModal}>
          <LoginModal />
        </Modal>
      )}
    </Container>
  );
};

export default Header;
