import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 100%;
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 20px 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const SubTitleWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;
