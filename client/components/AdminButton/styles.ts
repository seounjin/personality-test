import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  // width: 100%;
  // margin-right: 200px;

  button {
    // width: 80px;
    // height: 30px;
    padding: 10px 16px;
    border: none;
    margin: 0 5px 0 5px;
    font-weight: 600;
    // font-size: 14px;
    border-radius: 6px;
  }

  button:hover {
    cursor: pointer;
    background-color: #c0c0c5;
  }
`;

export default Wrapper;
