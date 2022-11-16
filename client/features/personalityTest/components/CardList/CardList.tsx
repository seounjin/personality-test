import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  StyledLink,
  Headline,
  MoreOutlinedContainer,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';
import Image from 'next/image';
import MoreOutlined from '../MoreOutlined/MoreOutlined';
import MultiList from '../Multilist/MultiList';

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
              <CardItemHeader>
                <Image
                  alt="card-img"
                  src={imgUrl}
                  width="100%"
                  height="100%"
                  layout="responsive"
                />
                <MoreOutlinedContainer>
                  <MoreOutlined />
                  <MultiList cardId={id} />
                </MoreOutlinedContainer>
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
