import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPanel } from '../../../../store/modules/mypage';
import Sidebar from '../../components/SideBar/Sidebar';
import { Container } from './Aside.style';

const SIDEBAR_MENU = [
  { id: 's1', text: '내가 만든 테스트', isActive: true },
  { id: 's2', text: '회원탈퇴', isActive: false },
];

const Aside = () => {
  const [sidebarMenu, setSidebarMenu] = useState(SIDEBAR_MENU);
  const dispatch = useDispatch();

  const handleClick = (currentIndex: number) => {
    const newSidebarMenu = sidebarMenu.map((data, index) => ({
      ...data,
      isActive: index === currentIndex,
    }));

    dispatch(setCurrentPanel(currentIndex));
    setSidebarMenu(newSidebarMenu);
  };

  return (
    <Container>
      <Sidebar handleClick={handleClick} sidebarMenu={sidebarMenu} />
    </Container>
  );
};

export default Aside;
