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
`;

export const TagsWrapper = styled.div``;

export const TwoButtonWrapper = styled.div`
  position: relative;
  top: 80%;
`;

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
    padding: 20px;
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
`;

export const CardHoverExplain = styled.span`
  position: absolute;
  top: 150%;
  transition: all 0.4s;
`;
