import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Sidebar from '../SideBar/Sidebar';
import BarsIcon from '../BarsIcon/BarsIcon';
import { LOGIN_MENU, LOGOUT_MENU } from './BarsMenu.const';
import { Container, Overlay, SideBarWrapper } from './BarsMenu.style';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store/modules';
import fetcher from '../../api/fetcher';

const BarsMenu = (): JSX.Element => {
  const { isAuth } = useSelector(
    (state: RootState) => ({
      isAuth: state.auth.isAuth,
    }),
    shallowEqual,
  );

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetcher('get', '/user/logout');
    if (res.success) {
      alert('로그아웃 되었습니다');
      router.replace('/');
    } else {
      alert('로그아웃을 실패 하셨습니다');
      router.reload();
    }
  };

  const handleClick = (asPath) => {
    setIsSideBarOpen(!isSideBarOpen);

    if (asPath === '/logout') {
      handleLogout();
      return;
    }
    router.push(asPath);
  };

  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Container>
      <BarsIcon onClick={handleSideBar} />
      <Overlay onClick={handleSideBar} isSideBarOpen={isSideBarOpen} />
      <SideBarWrapper className={isSideBarOpen ? 'open' : ''}>
        {isAuth ? (
          <Sidebar onClick={handleClick} sidebarMenu={LOGIN_MENU} />
        ) : (
          <Sidebar onClick={handleClick} sidebarMenu={LOGOUT_MENU} />
        )}
      </SideBarWrapper>
    </Container>
  );
};

export default BarsMenu;
