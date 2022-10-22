import styled from 'styled-components';

interface CardItemHeaderProps {
  imgUrl: string;
}

export const Wrapper = styled.ul`
  padding: 0;
`;

export const CardItem = styled.li`
  width: 25%;
  list-style: none;
  padding: 10px;
  display: inline-block;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
  }
`;

export const CardItemHeader = styled.div<CardItemHeaderProps>`
  padding-bottom: 75%;
  position: relative;
  background-image: url(${(props) => props.imgUrl});
  border-radius: 4px;
  background-size: cover;
  background-position: 50%;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
`;
export const CardItemBody = styled.div`
  color: black;
`;

export const StyledLink = styled.a`
  text-decoration: none;
`;

export const Headline = styled.h1``;
