import styled from 'styled-components';

export const Container = styled.div`
  width: 240px;
`;

export const Text = styled.p`
  font-weight: bold;
  font-size: 16px;
`;

export const TextWrapper = styled.div`
  text-align: left;
`;

export const TwoButtonWrapper = styled.div`
  margin-top: 40px;
  button: last-child {
    background-color: ${({ theme }) => theme.colors.buttonDisabledColor};
  }
`;
