import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;

  ${({ theme }) =>
    theme.device.laptop`
display: none;`}
`;
