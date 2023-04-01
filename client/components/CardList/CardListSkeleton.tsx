import React from 'react';
import SkeletonBar from '../SkeletonBar/SkeletonBar';
import { CardItem, Wrapper } from './CardList.style';
import { SkeletonBarWrapper, SkeletonHeader } from './CardListSkeleton.style';

interface CardListSkeletonProps {
  CardListLength: number;
}

const CardListSkeleton = ({
  CardListLength = 1,
}: CardListSkeletonProps): JSX.Element => {
  return (
    <Wrapper>
      {Array(CardListLength)
        .fill(0)
        .map((_, index) => (
          <CardItem key={`s${index}`}>
            <SkeletonHeader />
            <SkeletonBarWrapper>
              <SkeletonBar width="100%" height="25px" />
            </SkeletonBarWrapper>
            <SkeletonBarWrapper>
              <SkeletonBar width="65px" height="25px" />
            </SkeletonBarWrapper>
          </CardItem>
        ))}
    </Wrapper>
  );
};

export default CardListSkeleton;
