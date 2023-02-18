import styled from 'styled-components';
import {
  MenuWrapper,
  Wrapper,
  MenuButton,
} from '../../../../components/SideBar/Sidebar.style';

export const TabListWrapper = styled(Wrapper)``;

export const TabWrapper = styled(MenuWrapper)`
  border-radius: 12px;
`;

export const Tab = styled(MenuButton)`
  border-radius: 8px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.black : theme.colors.sideBarMenuButtonColor};
`;
