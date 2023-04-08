import React from 'react';
import {
  Wrapper,
  CardItem,
  CardItemHeader,
  CardItemBody,
  Headline,
  TagsWrapper,
  Description,
} from '../../../../components/CardList/CardList.style';
import { Card } from '../../../../components/CardList/CardList.type';
import Image from 'next/image';
import Tag from '../../../../components/Tag/Tag';
import Link from 'next/link';
import { PARSE_TAG_TEXT } from '../../../tests/tests.const';
import {
  ButtonContainer,
  ButtonTag,
  ButtonWrapper,
  DeleteButton,
  EditButton,
  ShareButton,
} from './MypageCardList.style';

type MypageCardListProps = {
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
};

const MypageCardList = ({
  cardItems,
  handleLeftButton,
  handleRightButton,
}: MypageCardListProps): JSX.Element => {
  return (
    <Wrapper>
      {cardItems.map(({ title, explain, id, testType, thumbnailImgUrl }) => (
        <Link
          href={{
            pathname: `/main/${id}`,
            query: { test: testType },
          }}
          rel="noopener noreferrer"
          target="_blank"
          key={id}
        >
          <CardItem>
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
              <Description>{explain}</Description>
              <TagsWrapper>
                <Tag
                  name={`${PARSE_TAG_TEXT[testType]}유형`}
                  backgroundColor={`${testType}TypeTagBgColor`}
                />
              </TagsWrapper>

              <ButtonContainer>
                <ButtonWrapper>
                  <DeleteButton
                    type="button"
                    aria-label="삭제 버튼"
                    onClick={(event) => handleLeftButton(event, id, testType)}
                  />
                  <ButtonTag>삭 제</ButtonTag>
                </ButtonWrapper>
                <ButtonWrapper>
                  <EditButton
                    type="button"
                    aria-label="수정 버튼"
                    onClick={(event) => handleRightButton(event, id, testType)}
                  />
                  <ButtonTag>수 정</ButtonTag>
                </ButtonWrapper>
                <ButtonWrapper>
                  <ShareButton type="button" aria-label="공유 버튼" />
                  <ButtonTag>공 유</ButtonTag>
                </ButtonWrapper>
              </ButtonContainer>
            </CardItemBody>
          </CardItem>
        </Link>
      ))}
    </Wrapper>
  );
};

export default MypageCardList;
