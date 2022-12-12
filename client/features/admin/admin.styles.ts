import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 50px);
  margin-top: 50px;
  background-color: ${(props) => props.theme.colors.gray_background};
  padding: 10px;

  ${({ theme }) =>
    theme.device.mobile`
    padding: 20px 0;
    background-color: ${theme.colors.white};`}
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 754px;
  height: 100%;
`;
