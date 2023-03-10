import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
`;

export const Text = styled.h3`
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
  word-break: keep-all;
`;

export const TwoButtonWrapper = styled.div`
  margin-top: 40px;
  button:last-child {
    background-color: ${({ theme }) => theme.colors.noButtonColor};

    &: hover {
      background-color: ${({ theme }) => theme.colors.noButtonHoverColor};
    }
  }
`;
