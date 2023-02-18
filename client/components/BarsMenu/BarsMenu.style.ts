import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  position: relative;
  // padding-right: 15px;

  ${({ theme }) =>
    theme.device.laptop`
  display: inline;
  `}
`;

export const SideBarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.1);
`;

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;
