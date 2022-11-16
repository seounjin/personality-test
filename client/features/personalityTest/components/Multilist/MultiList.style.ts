import styled from 'styled-components';

export const Wrapper = styled.ul`
  display: none;
  position: absolute;
  top: 30px;
  right: 2px;
  list-style: none;
  padding: 0px;
  background-color: white;
  border: 1px solid rgb(224, 227, 231);
  border-radius: 4px;

  li:last-child {
    border: none;
  }
  li:first-child:hover {
    border-radius: 3px 3px 0px 0px;
    background-color: #f3f3f4;
  }
  li:last-child:hover {
    border-radius: 0px 0px 3px 3px;
    background-color: #f3f3f4;
  }
`;

export const MultiListItem = styled.li`
  font-size: 14px;
  font-weight: 500;
  padding: 4px;
  border-bottom: 1px solid rgb(224, 227, 231);
`;
