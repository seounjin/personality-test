import { useRouter } from 'next/router';
import React from 'react';
import { Wrapper, AngleLeftSolidIcon } from './BackButton.style';

const BackButton = (): JSX.Element => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Wrapper onClick={handleClick}>
      <AngleLeftSolidIcon />
    </Wrapper>
  );
};
export default BackButton;
