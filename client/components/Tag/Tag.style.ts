import styled from 'styled-components';

interface TextProps {
  backgroundColor: string;
  color: string;
}

export const Wrapper = styled.div``;

export const Text = styled.span<TextProps>`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
`;
