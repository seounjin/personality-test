import { useRouter } from 'next/router';
import React from 'react';
import { Button, AngleLeftSolidIcon } from './BackButton.style';

const BackButton = (): JSX.Element => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <Button className="back_button" onClick={handleClick}>
      <AngleLeftSolidIcon />
    </Button>
  );
};
export default BackButton;
