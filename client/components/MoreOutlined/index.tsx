import { useState } from 'react';
import Button from './styles';
import Multilist from '../Multilist';

interface MoreOutLineProps {
  handleModal: (card?: string) => void;
  cardId: string;
}

const MoreOutlined = ({
  handleModal,
  cardId,
}: MoreOutLineProps): JSX.Element => {
  const [isClicked, setClicked] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    // handleModal();
    setClicked(!isClicked);
  };

  return (
    <Button aria-label="img-btn" onClick={onClick}>
      <img alt="moreOutlined" src={'/vertical_icon.png'}></img>
      {isClicked && <Multilist cardId={cardId} handleModal={handleModal} />}
    </Button>
  );
};
export default MoreOutlined;
