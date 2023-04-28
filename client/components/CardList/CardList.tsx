import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  Headline,
  TagsWrapper,
  CardHoverWrapper,
  CardHoverExplain,
  CardHoverTitle,
  CardItemImage,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';
import Tag from '../Tag/Tag';
import { PARSE_TAG_TEXT } from '../../features/tests/tests.const';

type CardListProps = {
  cardItems: Card[];
};

const CardList = ({ cardItems }: CardListProps): JSX.Element => {
  return (
    <Wrapper>
      {cardItems.map(({ title, explain, id, testType, thumbnailImgUrl }) => (
        <CardItem key={id}>
          <CardHoverWrapper className="card_hover_wrapper">
            <Link
              href={{
                pathname: `/main/${id}`,
                query: { test: testType },
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              <CardHoverTitle className="card_hover_title">
                {title}
              </CardHoverTitle>
              <CardHoverExplain className="card_hover_explain">
                {explain}
              </CardHoverExplain>
            </Link>
          </CardHoverWrapper>

          <CardItemHeader>
            <CardItemImage
              alt="card-img"
              src={thumbnailImgUrl}
              fill
              priority
              sizes="(max-width: 768px) 50%, 25%"
            />
          </CardItemHeader>
          <CardItemBody>
            <Headline>{title}</Headline>
            <TagsWrapper>
              <Tag
                name={`${PARSE_TAG_TEXT[testType]}유형`}
                backgroundColor={`${testType}TypeTagBgColor`}
              />
            </TagsWrapper>
          </CardItemBody>
        </CardItem>
      ))}
    </Wrapper>
  );
};

export default CardList;
