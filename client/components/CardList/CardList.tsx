import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  StyledLink,
  Headline,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';
import MoreOutlined from '../MoreOutlined/MoreOutlined';

type CardListProps = {
  cardItems: Card[];
};

const CardList = ({ cardItems }: CardListProps): JSX.Element => {
  return (
    <Wrapper>
      {cardItems.map(({ title, id, imgUrl }) => (
        <CardItem key={id}>
          <Link
            href={{
              pathname: `/main/${id}`,
            }}
            passHref
          >
            <StyledLink>
              <CardItemHeader imgUrl={imgUrl}>
                <MoreOutlined />
              </CardItemHeader>
              <CardItemBody>
                <Headline>{title}</Headline>
              </CardItemBody>
            </StyledLink>
          </Link>
        </CardItem>
      ))}
    </Wrapper>
  );
};

export default CardList;
