import styled from 'styled-components';

export const Container = styled.div``;

interface TitleWrapperProps {
  justifyContent: string;
}

export const TitleWrapper = styled.div<TitleWrapperProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

export const Title = styled.h3`
  font-size: 1.6rem;
`;
