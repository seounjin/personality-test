import styled from 'styled-components';

export const Button = styled.button`
  width: 260px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin: 10px;
  height: 60px;
  text-align: center;
  border: none;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.startButtonColor};

  &: hover {
    color: ${({ theme }) => theme.colors.ovalButtonHoverColor};
  }
`;
