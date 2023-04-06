import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${({ theme }) => theme.colors.lastScreenTitleColor};

  ${({ theme }) =>
    theme.device.mobile`
      font-size: 25px;
    `}
`;

export const Content = styled.div`
  font-size: 18px;
  line-height: 1.4;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  padding: 20px;
  margin: 20px 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.lastScreenContentColor};
`;
