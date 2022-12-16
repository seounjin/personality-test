import styled from 'styled-components';

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoardWrapper = styled.div`
  margin-bottom: 10px;
  width: 280px;
`;

export const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

export const Label = styled.label``;

export const Span = styled.span``;

export const BoardItemWrapper = styled.div`
  flex: 1;
  text-align: center;
`;
