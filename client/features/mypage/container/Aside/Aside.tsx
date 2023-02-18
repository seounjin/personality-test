import { useRouter } from 'next/router';
import React from 'react';
import TabList from '../../components/TabList/TabList';
import { Container } from './Aside.style';

const TAB_List = [
  {
    id: 's1',
    text: '내가 만든 테스트',
    type: 'button',
    asPath: '/mypage?menu=my-personality',
    subMenu: [],
  },
  {
    id: 's2',
    text: '회원탈퇴',
    type: 'button',
    asPath: '/mypage?menu=signout',
    subMenu: [],
  },
];

const Aside = () => {
  const router = useRouter();

  const handleClick = (asPath: string) => {
    router.push(asPath, undefined, { shallow: true });
  };

  return (
    <Container>
      <TabList onClick={handleClick} tabList={TAB_List} />
    </Container>
  );
};

export default Aside;
