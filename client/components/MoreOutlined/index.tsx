import { useState } from 'react';
import Button from './styles';
import Multilist from '../Multilist';

const MoreOutlined = ({ handleModal }) => {
  const [isClicked, setClicked] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    // handleModal();
    setClicked(!isClicked);
    console.log('하이');
  };

  return (
    <Button aria-label="img-btn" onClick={onClick}>
      <img alt="moreOutlined" src={'/vertical_icon.png'}></img>
      {isClicked && <Multilist handleModal={handleModal} />}
    </Button>
  );
};
export default MoreOutlined;
