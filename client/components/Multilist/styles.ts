import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  display: none;
  top: 30px;
  right: 2px;
  background-color: white;
  border: 1px solid rgb(224, 227, 231);
  border-radius: 4px;

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    box-shadow: rgb(170 180 190 / 30%) 0px 4px 20px;
    li {
      font-size: 14px;
      font-weight: 500;
      padding: 4px;
      color: black;
    }
  }
`;

export default Wrapper;
