import styled from 'styled-components';

export const Wrapper = styled.div`
  display: none;
  ${({ theme }) =>
    theme.device.laptop`
display: inline;`}
`;
