import styled from 'styled-components';

export const Container = styled.div`
  width: 240px;
`;

export const Text = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 1.9;
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
