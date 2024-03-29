import styled from 'styled-components';

interface WrapperProps {
  justifyContent: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 16px;
`;
