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
    li:first-child:hover {
      border-radius: 3px 3px 0px 0px;
      background-color: #f3f3f4;
    }
    li:last-child:hover {
      border-radius: 0px 0px 3px 3px;
      background-color: #f3f3f4;
    }
  }
`;

export default Wrapper;
