import styled from 'styled-components';

export const CardItemHeader = styled.div`
  position: relative;
  padding-top: 75%;
  border-radius: 4px;
  border: solid 2px rgb(0 0 0 / 10%);
  img {
    border-radius: 4px;
    object-fit: cover;
    object-position: 50% 30%;
  }
`;

export const Wrapper = styled.ul`
  padding: 0;
  margin: 0;
`;

export const CardItem = styled.li`
  position: relative;
  overflow: hidden;
  width: 25%;
  list-style: none;
  padding: 10px;
  display: inline-block;

  ${({ theme }) =>
    theme.device.tablet`
  width: 50%;`}

  &: hover {
    .card_hover_wrapper {
      opacity: 1;
    }
  }
`;

export const CardItemBody = styled.div`
  color: black;
`;

export const Headline = styled.h3`
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TagsWrapper = styled.div``;

export const CardHoverWrapper = styled.div`
  border-radius: 4px;

  position: absolute;
  width: calc(100% - 20px);
  height: 100%;
  z-index: 10;
  opacity: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: rgba(0, 0, 0, 0.7);

  font-size: 18px;
  font-weight: 500;

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    text-decoration: none;

    &: hover {
      .card_hover_title {
        bottom: 70%;
      }
      .card_hover_explain {
        top: 30%;
      }
    }
  }
`;

export const CardHoverTitle = styled.h3`
  position: absolute;
  bottom: 150%;
  transition: all 0.4s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: 0 10px;
`;

export const CardHoverExplain = styled.span`
  position: absolute;
  top: 150%;
  transition: all 0.4s;

  line-height: 1.4;
  padding: 0 10px;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.4;
`;
