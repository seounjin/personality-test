import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Logo from '../Logo/Logo';
import { NavLink } from '../NavLink/NavLink';
import { Wrapper } from './LeftMenu.style';

const LEFT_MENU = [
  { id: 'n1', url: '/', content: '성향 테스트', pathName: '/' },
  {
    id: 'n2',
    url: '/admin',
    content: '성향 테스트 만들기',
    pathName: '/admin',
  },
];

const LeftMenu = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Logo />
      {LEFT_MENU.map((data) => {
        return (
          <NavLink key={data.id} isActive={router.pathname === data.pathName}>
            <Link href={data.url}>{data.content}</Link>
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default LeftMenu;
