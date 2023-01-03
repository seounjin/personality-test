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
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const Label = styled.label``;

export const Span = styled.span``;

export const BoardItemWrapper = styled.div`
  flex: 1;
  text-align: center;
`;
