import styled from 'styled-components';

const Wrapper = styled.header`
  position: relative;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid #e4e4e4;

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
