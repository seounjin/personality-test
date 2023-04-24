import styled from 'styled-components';
import { NavLinkProps } from './NavLink';

export const Wrapper = styled.div<NavLinkProps>`
  padding: 15px;
  a {
    color: ${({ theme, isActive }) =>
      isActive ? theme.colors.black : theme.colors.disabledLinkColor};
    text-decoration: none;
  }
`;
