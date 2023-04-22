import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 340px;
  padding: 8px;
  font-size: 16px;
  word-wrap: break-word;
  border: ${({ theme }) => theme.colors.textBoxBorderColor} solid 2px;
  border-radius: 4px;
  line-height: 20px;
`;
