import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  Headline,
  CardImageWrapper,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';

import Image from 'next/image';
import TwoButton from '../TwoButton/TwoButton';

type CardListProps = {
  cardItems: Card[];
  handleLeftButton?: (event: React.MouseEvent, id: string) => void;
  handleRightButton?: (event: React.MouseEvent, id: string) => void;
  type?: string;
};

const CardList = ({
  cardItems,
  handleLeftButton,
  handleRightButton,
  type = 'home',
}: CardListProps): JSX.Element => {
  const loaderProp = ({ src }) => {
    return src;
  };

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
                <Image
                  alt="card-img"
                  src={'/images/imageholder.png'}
                  fill
                  loader={loaderProp}
                />
              </CardImageWrapper>
            </CardItemHeader>
            <CardItemBody>
              <Headline>{title}</Headline>
              {type === 'mypage' && (
                <TwoButton
                  leftName="삭제"
                  leftButton={(event) => handleLeftButton(event, id)}
                  rightButton={(event) => handleRightButton(event, id)}
                  leftType="button"
                  rightType="button"
                  rightName="수정"
                />
              )}
            </CardItemBody>
          </Link>
        </CardItem>
      ))}
    </Wrapper>
  );
};

export default CardList;
