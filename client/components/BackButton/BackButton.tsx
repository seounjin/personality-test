import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, AngleLeftSolidIcon, NoneBlock } from './BackButton.style';

const BackButton = (): JSX.Element => {
  const router = useRouter();
  const [isGoBack, setIsGoBack] = useState(false);

  const handleClick = () => {
    router.back();
  };

  useEffect(() => {
    setIsGoBack(window.history.length > 1);
  }, []);

  return isGoBack ? (
    <Button onClick={handleClick}>
      <AngleLeftSolidIcon />
    </Button>
  ) : (
    <NoneBlock />
  );
};
export default BackButton;
