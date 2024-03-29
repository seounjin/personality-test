import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useFetcher } from '../../hooks/useFetcher';
import { RootState } from '../../store/modules';
import { NavLink } from '../NavLink/NavLink';
import { LoginButton, LogoutButton, Wrapper } from './RightMenu.style';

const RightMenu = (): JSX.Element => {
  const router = useRouter();
  const { isAuth } = useSelector(
    (state: RootState) => ({
      isAuth: state.auth.isAuth,
    }),
    shallowEqual,
  );

  const fetcher = useFetcher();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    const res = await fetcher('get', '/users/logout');
    if (res.success) {
      alert('로그아웃 되었습니다');
      router.reload();
    } else {
      alert('로그아웃을 실패 하셨습니다');
      router.reload();
    }
  };

  return (
    <Wrapper>
      {isAuth ? (
        <>
          <NavLink isActive={router.pathname === '/mypage'}>
            <Link title="마이페이지로 이동" href="/mypage?menu=my-personality">
              마이페이지
            </Link>
          </NavLink>

          <NavLink isActive={false}>
            <LogoutButton title="사용자 로그아웃" onClick={handleLogout}>
              로그아웃
            </LogoutButton>
          </NavLink>
        </>
      ) : (
        <NavLink isActive={false}>
          <LoginButton title="사용자 로그인" onClick={handleLogin}>
            로그인
          </LoginButton>
        </NavLink>
      )}
    </Wrapper>
  );
};

export default RightMenu;
