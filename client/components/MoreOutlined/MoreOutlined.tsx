import React, { useState } from 'react';
import { Button, Image } from './MoreOutlined.style';

const MoreOutlined = (): JSX.Element => {
  const [isClicked, setClicked] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    setClicked(!isClicked);
  };

  return (
    <Button aria-label="img-btn" onClick={onClick}>
      <Image alt="moreOutlined" src={'/vertical_icon.png'} />
    </Button>
  );
};
export default MoreOutlined;
