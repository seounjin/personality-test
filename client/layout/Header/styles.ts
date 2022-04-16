import styled from 'styled-components';

const Wrapper = styled.header`
  position: relative;
  height: 50px;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  nav {
    display: flex;
    max-width: 1060px;
    margin: 0 auto;
    height: 100%;

    div:first-child {
      font-weight: bold;
    }

    div {
      padding: 15px 20px;
    }

    div > a {
      text-decoration: none;
    }
  }
`;

export default Wrapper;
