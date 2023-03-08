import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 230px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  padding: 6px;
  flex-direction: column;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface MenuButtonProps {
  isActive: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  padding: 0 0 0 10px;
  font-weight: bold;
  width: 100%;
  height: 54px;
  border: none;
  text-align: left;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.sideBarMenuButtonColor : theme.colors.white};
`;

export const MenuTitle = styled.div`
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: none;

  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: bold;
  padding-left: 10px;
`;

export const Menu = styled(MenuButton)`
  margin: 2px 0;

  &:hover {
    background-color: ${({ theme, isActive }) =>
      isActive ? 'none' : theme.colors.sideBarMenuButtonColor};
  }
`;

export const SubMenu = styled(MenuButton)`
  padding-left: 30px;
  margin: 2px 0;
  &:hover {
       
    background-color: ${({ theme, isActive }) =>
      isActive ? 'none' : theme.colors.sideBarMenuButtonColor};
  }
  }
`;
