import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  display: none;
  background: none;
  border: none;
  top: 4px;
  right: 0;
  z-index: 1;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
  }
`;

export default Button;
