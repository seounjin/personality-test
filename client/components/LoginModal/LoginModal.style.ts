import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div``;

export const TitleWrapper = styled.div``;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`;

export const LoginFormButton = styled.button`
  border-radius: 3px;
  margin: 20px 0;
  width: 340px;
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

  a {
    text-decoration: none;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.loginFormLinkTextColor};
  cursor: pointer;
  &: hover {
    color: ${({ theme }) => theme.colors.loginFormLinkTextHoverColor};
  }
`;
