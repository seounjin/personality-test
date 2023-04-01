import React from 'react';
import { SkeletonBarWrapper } from '../../../../components/CardList/CardListSkeleton.style';
import SkeletonBar from '../../../../components/SkeletonBar/SkeletonBar';
import { TEST_TYPE_DATA } from '../../tests.const';
import {
  Content,
  HeaderSkeleton,
  Wrapper,
} from './TestTypeButtonsSkeleton.style';

const TestTypeButtonsSkeleton = (): JSX.Element => {
  return (
    <>
      {TEST_TYPE_DATA.map(({ id }) => (
        <Wrapper key={id}>
          <HeaderSkeleton />
          <Content>
            {['s1', 's2', 's3', 's4'].map((id) => (
              <SkeletonBarWrapper key={id}>
                <SkeletonBar width="100%" height="20px" />
              </SkeletonBarWrapper>
            ))}
          </Content>
        </Wrapper>
      ))}
    </>
  );
};

export default TestTypeButtonsSkeleton;
