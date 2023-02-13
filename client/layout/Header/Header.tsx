import { useRouter } from 'next/router';
import { useState } from 'react';
import fetcher from '../../api/fetcher';
import LeftMenu from '../../components/LeftMenu/LeftMenu';
import LoginModal from '../../components/LoginModal/LoginModal';
import Modal from '../../components/Modal/Modal';
import RightMenu from '../../components/RightMenu/RightMenu';
import { Container, Nav } from './Header.style';

const Header = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    const res = await fetcher('get', '/user/logout');
    console.log('res', res);
    if (res.success) {
      alert('로그아웃 되었습니다');
      router.reload();
    } else {
      alert('로그아웃을 실패 하셨습니다');
      router.reload();
    }
  };

  return (
    <Container>
      <Nav>
        <LeftMenu />
        <RightMenu handleModal={handleModal} handleLogout={handleLogout} />
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
