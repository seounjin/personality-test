import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  div: last-child {
    margin-bottom: 0px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ScoreWrapper = styled.div`
  width: 140px;
  display: flex;
  justify-content: center;
`;

export const Score = styled.span`
  font-size: 1.5rem;
`;
