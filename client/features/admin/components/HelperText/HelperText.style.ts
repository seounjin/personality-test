import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 1.3rem;
  padding-left: 6px;
`;

export const P = styled.p`
  margin: 0;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.helperTextColor};
`;
