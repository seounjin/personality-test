import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  min-height: 100%;
  padding: 50px 10px 10px 10px;
  background-color: ${(props) => props.theme.colors.gray_background};

  ${({ theme }) =>
    theme.device.mobile`
    padding: 20px 0;
    background-color: ${theme.colors.white};`}
`;

export const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  height: 100%;
`;

export const SetCounterButtonWrapper = styled.div`
  margin-bottom: 40px;
`;

export const SubTitle = styled.h2`
  font-size: 1.7rem;
`;

export const TwoButtonWrapper = styled.div`
  button {
    background-color: #9e7676;
    &:hover:enabled {
      background-color: #e3caa5;
    }
  }
`;
