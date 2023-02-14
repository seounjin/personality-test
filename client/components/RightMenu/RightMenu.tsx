import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { NavLink } from '../NavLink/NavLink';
import {
  LoginButton,
  LogoutButton,
  MypageButton,
  Wrapper,
} from './RightMenu.style';

interface RightMenuProps {
  handleModal: () => void;
  handleLogout: () => void;
}

const RightMenu = ({
  handleModal,
  handleLogout,
}: RightMenuProps): JSX.Element => {
  const { isAuth } = useSelector(
    (state: RootState) => ({
      isAuth: state.home.isAuth,
    }),
    shallowEqual,
  );

  return (
    <Wrapper>
      {isAuth ? (
        <>
          <NavLink isActive={false}>
            <MypageButton>마이페이지</MypageButton>
          </NavLink>

          <NavLink isActive={false}>
            <LogoutButton onClick={handleLogout}> 로그아웃</LogoutButton>
          </NavLink>
        </>
      ) : (
        <NavLink isActive={false}>
          <LoginButton onClick={handleModal}>로그인</LoginButton>
        </NavLink>
      )}
    </Wrapper>
  );
};

export default RightMenu;
