import React from 'react';
import { TEST_TYPE_DATA } from '../../tests.const';
import {
  Content,
  ContentSkeleton,
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
            {['s1', 's2', 's3', 's4'].map((data) => (
              <ContentSkeleton key={data} />
            ))}
          </Content>
        </Wrapper>
      ))}
    </>
  );
};

export default TestTypeButtonsSkeleton;
