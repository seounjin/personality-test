import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const LoginButton = styled(Button)``;

export const LogoutButton = styled(Button)``;

export const MypageButton = styled(Button)``;
