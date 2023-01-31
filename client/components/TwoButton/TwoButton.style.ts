import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border: none;
  margin: 0 5px 0 5px;
  font-weight: 600;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.buttonFontColor};
  background-color: ${({ theme }) => theme.colors.buttonColor};

  &:disabled {
    cursor: auto;
    background-color: ${({ theme }) => theme.colors.buttonDisabledColor};
  }

  &:hover:enabled {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;
