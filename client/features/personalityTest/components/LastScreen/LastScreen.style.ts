import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 17px;
`;

export const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lastScreenTitleColor};
  box-shadow: inset 0 -20px 0 ${({ theme }) => theme.colors.mainPageSubColor};
`;

export const Content = styled.div`
  font-size: 18px;
  line-height: 1.3;
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
  height: 500px;
  padding: 40px;
  margin: 20px 0;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.lastScreenContentColor};

  ${({ theme }) =>
    theme.device.mobile`
  height: 420px;`}
`;
