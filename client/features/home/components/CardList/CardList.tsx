import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  Headline,
  MoreOutlinedContainer,
  CardImage,
  CardImageWrapper,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';
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
            <CardItemHeader>
              <CardImageWrapper>
                <CardImage
                  alt="card-img"
                  src={`/imageholder.png`}
                  layout="fill"
                  objectFit="cover"
                />
              </CardImageWrapper>
              <MoreOutlinedContainer>
                <MoreOutlined />
                <MultiList cardId={id} />
              </MoreOutlinedContainer>
            </CardItemHeader>
            <CardItemBody>
              <Headline>{title}</Headline>
            </CardItemBody>
          </Link>
        </CardItem>
      ))}
    </Wrapper>
  );
};

export default CardList;
