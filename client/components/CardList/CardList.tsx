import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  Headline,
  TagsWrapper,
  TwoButtonWrapper,
  CardHoverWrapper,
  CardHoverExplain,
  CardHoverTitle,
} from './CardList.style';
import Link from 'next/link';
import { Card } from './CardList.type';
import Image from 'next/image';
import TwoButton from '../TwoButton/TwoButton';
import Tag from '../Tag/Tag';
import { PARSE_TAG_TEXT } from '../../features/tests/tests.const';

type CardListProps = {
  cardItems: Card[];
  handleLeftButton?: (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => void;
  handleRightButton?: (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => void;
  type?: string;
};

const CardList = ({
  cardItems,
  handleLeftButton,
  handleRightButton,
  type = 'home',
}: CardListProps): JSX.Element => {
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
            {type === 'mypage' && (
              <TwoButtonWrapper>
                <TwoButton
                  leftName="삭제"
                  leftButton={(event) => handleLeftButton(event, id, testType)}
                  rightButton={(event) =>
                    handleRightButton(event, id, testType)
                  }
                  leftType="button"
                  rightType="button"
                  rightName="수정"
                />
              </TwoButtonWrapper>
            )}
          </CardHoverWrapper>

          <CardItemHeader>
            <Image
              alt="card-img"
              src={thumbnailImgUrl}
              fill
              loading="eager"
              priority
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
