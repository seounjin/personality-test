import React, { Fragment } from 'react';
import SkeletonBar from '../../../../components/SkeletonBar/SkeletonBar';
import { Container } from './SkeletonSignoutForm.style';

const SkeletonSignoutForm = () => {
  return (
    <Container>
      {['s1', 's2', 's3'].map((id) => (
        <Fragment key={id}>
          <SkeletonBar width="340px" height="40px" />
        </Fragment>
      ))}
    </Container>
  );
};

export default SkeletonSignoutForm;
