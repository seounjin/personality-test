import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 360px;
  flex-direction: column;
  align-items: center;
  margin: 10px;

  input {
    display: none;
  }

  img {
    width: 240px;
    margin-bottom: 20px;
  }

  button {
    width: 240px;
    height: 40px;
    border: none;
    font-size: 13px;
    font-weight: 600;
    color: #808080;
  }

  button:hover {
    cursor: pointer;
  }
`;

export default Wrapper;
