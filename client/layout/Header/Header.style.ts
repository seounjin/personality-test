import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #e4e4e4;
  z-index: 1000;
  background-color: white;
`;

export const Container = styled(Header)``;

export const Nav = styled.nav`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  height: 100%;
`;

export const NavContent = styled.div`
  padding: 15px 20px;
  a {
    text-decoration: none;
  }
`;
