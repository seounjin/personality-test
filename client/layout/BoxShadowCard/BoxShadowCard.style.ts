import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 754px;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 20px 0;
  box-shadow: ${({ theme }) => theme.boxShadow};

  ${({ theme }) =>
    theme.device.mobile`
    box-shadow: none;
  `}
`;

export const SubTitleWrapper = styled.div`
  margin-bottom: 20px;
`;

export const SubTitle = styled.h2`
  margin: 0;
  font-size: 18px;
`;
