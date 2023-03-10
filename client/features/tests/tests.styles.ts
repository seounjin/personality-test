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
  max-width: 754px;
  height: 100%;
`;
