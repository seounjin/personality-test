import styled from 'styled-components';

export const Form = styled.form``;

export const LoginFormButton = styled.button`
  border-radius: 3px;
  margin: 20px 0;
  width: 280px;
  height: 34px;
  border: none;
  font-size: 1.5rem;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.loginFormButtonColor};
  &: hover {
    background-color: ${({ theme }) => theme.colors.buttonHoverColor};
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export const Link = styled.a`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.loginFormLinkTextColor};
  cursor: pointer;
  &: hover {
    color: ${({ theme }) => theme.colors.loginFormLinkTextHoverColor};
  }
`;
