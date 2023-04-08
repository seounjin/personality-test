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
  Button,
  DeleteEimoji,
  EditEimoji,
  ShareEimoji,
  ButtonTag,
} from './MypageCardList.style';

type MypageCardListProps = {
  cardItems: Card[];
  deleteButtonClick: (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => void;
  updateButtonClick: (
    event: React.MouseEvent,
    id: string,
    testType: string,
  ) => void;
  shareButtonClick: (
    event: React.MouseEvent,
    id: string,
    testType: string,
    isPublic: boolean,
  ) => void;
};

const MypageCardList = ({
  cardItems,
  deleteButtonClick,
  updateButtonClick,
  shareButtonClick,
}: MypageCardListProps): JSX.Element => {
  return (
    <Wrapper>
      {cardItems.map(
        ({ title, explain, id, testType, thumbnailImgUrl, isPublic }) => (
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
                  <Button
                    type="button"
                    aria-label="삭제 버튼"
                    onClick={(event) => deleteButtonClick(event, id, testType)}
                  >
                    <DeleteEimoji />
                    <ButtonTag>삭 제</ButtonTag>
                  </Button>

                  <Button
                    type="button"
                    aria-label="수정 버튼"
                    onClick={(event) => updateButtonClick(event, id, testType)}
                  >
                    <EditEimoji />
                    <ButtonTag>수 정</ButtonTag>
                  </Button>

                  <Button
                    type="button"
                    aria-label="공유 버튼"
                    onClick={(event) =>
                      shareButtonClick(event, id, testType, isPublic)
                    }
                  >
                    <ShareEimoji />
                    <ButtonTag>공 유</ButtonTag>
                  </Button>
                </ButtonContainer>
              </CardItemBody>
            </CardItem>
          </Link>
        ),
      )}
    </Wrapper>
  );
};

export default MypageCardList;
