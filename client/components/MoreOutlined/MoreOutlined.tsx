import React from 'react';
import { Button, Image } from './MoreOutlined.style';

const MoreOutlined = (): JSX.Element => {
  const onClick = (event) => {
    event.preventDefault();
  };

  return (
    <Button aria-label="img-btn" onClick={onClick}>
      <Image alt="moreOutlined" src={'/vertical_icon.png'} />
    </Button>
  );
};
export default MoreOutlined;
