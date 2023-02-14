import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 230px;
`;

export const MenuWrapper = styled.div`
  display: flex;
  padding: 6px;
  border-radius: 12px;
  flex-direction: column;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

interface MenuButtonProps {
  isActive: boolean;
}

export const MenuButton = styled.button<MenuButtonProps>`
  font-weight: bold;
  width: 100%;
  height: 54px;
  border-radius: 8px;
  border: none;
  text-align: left;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.sideBarMenuButtonColor : theme.colors.white};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.black : theme.colors.sideBarMenuButtonColor};
`;
