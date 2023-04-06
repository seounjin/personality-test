import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ theme }) =>
    theme.device.mobile`
    h2 {
      font-size: 25px;
    }

    h3 {
      font-size: 20px;
    }
    
    `}
`;

export const ButtonWrapper = styled.div`
  margin-top: 60px;
  font-size: 20px;
`;

export const Headline = styled.h2`
  font-size: 30px;
  box-shadow: inset 0 -20px 0 ${({ theme }) => theme.colors.mainPageSubColor};
`;

export const SubTitle = styled.h3`
  font-size: 23px;
  margin: 0;
  color: ${({ theme }) => theme.colors.mainPageSubColor};
`;
