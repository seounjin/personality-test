import styled from 'styled-components';

export const Wrapper = styled.ul`
  padding: 0;
`;

export const CardItem = styled.li`
  width: 25%;
  list-style: none;
  padding: 10px;
  display: inline-block;

  a {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
  }
`;

export const CardItemHeader = styled.div`
  position: relative;
  border-radius: 4px;
  border: solid 2px rgb(0 0 0 / 10%);
`;

export const CardItemBody = styled.div`
  color: black;
`;

export const Headline = styled.h1``;

export const MoreOutlinedContainer = styled.div`
  &:hover {
    ul {
      display: inline;
    }
  }
`;
