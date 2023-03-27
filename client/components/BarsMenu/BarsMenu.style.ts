import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  position: relative;

  ${({ theme }) =>
    theme.device.laptop`
  display: inline;
  `}
`;

interface OverlayProps {
  isSideBarOpen: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  display: ${({ isSideBarOpen }) => (isSideBarOpen ? 'inline' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.1);
  z-index: 100;
`;

export const SideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 230px;
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.5s ease-in-out;

  &.open {
    transform: translateX(0%);
  }
`;
