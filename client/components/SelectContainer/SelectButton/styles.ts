import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 13px 0;
  font-size: 1.4rem;
  button {
    border: none;
    padding: 10px 16px;
    margin: 0 5px 0 5px;
    font-weight: 600;
    background-color: #f3f3f4;
    border-radius: 6px;
  }

  button:hover {
    cursor: pointer;
    background-color: #c0c0c5;
  }
`;

export default Wrapper;
