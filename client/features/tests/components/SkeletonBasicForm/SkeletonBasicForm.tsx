import React from 'react';
import SkeletonBar from '../../../../components/SkeletonBar/SkeletonBar';
import { Container, Wrapper } from './SkeletonBasicForm.style';

const SkeletonBasicForm = () => {
  return (
    <Container>
      <Wrapper>
        <SkeletonBar width="340px" height="34px" />
      </Wrapper>
      <Wrapper>
        <SkeletonBar width="340px" height="34px" />
      </Wrapper>
      <Wrapper>
        <SkeletonBar width="340px" height="34px" />
      </Wrapper>
      <SkeletonBar width="300px" height="222px" />
    </Container>
  );
};

export default SkeletonBasicForm;
