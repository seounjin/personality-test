import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  button {
    padding: 10px 16px;
    border: none;
    margin: 0 5px 0 5px;
    font-weight: 600;
    border-radius: 6px;
  }

  button:hover {
    cursor: pointer;
    background-color: #c0c0c5;
  }
`;

export default Wrapper;
