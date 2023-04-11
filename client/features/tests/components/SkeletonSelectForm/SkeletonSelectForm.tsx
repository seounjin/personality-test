import React, { Fragment } from 'react';
import SkeletonBar from '../../../../components/SkeletonBar/SkeletonBar';
import { Wrapper } from './SkeletonSelectForm.style';

const SkeletonSelectForm = () => {
  return (
    <>
      <Wrapper>
        <SkeletonBar width="100px" height="30px" />
      </Wrapper>

      {['s1', 's2'].map((id) => {
        return (
          <Fragment key={id}>
            <Wrapper>
              <SkeletonBar width="340px" height="34px" />
            </Wrapper>

            <Wrapper>
              <SkeletonBar width="340px" height="34px" />
            </Wrapper>
            <Wrapper>
              <SkeletonBar width="140px" height="30px" />
              <SkeletonBar width="140px" height="30px" />
            </Wrapper>

            <Wrapper>
              <SkeletonBar width="140px" height="30px" />
              <SkeletonBar width="140px" height="30px" />
            </Wrapper>
            <Wrapper>
              <SkeletonBar width="340px" height="34px" />
            </Wrapper>
          </Fragment>
        );
      })}
    </>
  );
};

export default SkeletonSelectForm;
