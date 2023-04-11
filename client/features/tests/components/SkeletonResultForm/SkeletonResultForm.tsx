import React from 'react';
import SkeletonBar from '../../../../components/SkeletonBar/SkeletonBar';
import { Container, Wrapper } from './SkeletonResultForm.style';

const SkeletonResultForm = () => {
  return (
    <Container>
      <Wrapper>
        <SkeletonBar width="100px" height="30px" />
      </Wrapper>

      <Wrapper>
        <SkeletonBar width="340px" height="34px" />
        <SkeletonBar width="340px" height="240px" />
      </Wrapper>

      <Wrapper>
        <SkeletonBar width="340px" height="34px" />
        <SkeletonBar width="340px" height="240px" />
      </Wrapper>
    </Container>
  );
};

export default SkeletonResultForm;
