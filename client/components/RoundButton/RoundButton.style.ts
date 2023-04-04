import styled from 'styled-components';

export const Wrapper = styled.button`
  background-color: ${({ theme }) => theme.colors.roundButtonColor};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 24px;
  width: 80px;
  height: 35px;
  border: none;
  font-size: 14px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;
