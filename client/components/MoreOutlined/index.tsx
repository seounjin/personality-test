import React, { useState, useCallback } from 'react';
import Multilist from '../Multilist';
import Button from './styles';

interface MoreOutLineProps {
  cardId: string;
  handleMultilist: (
    event: React.MouseEvent<HTMLElement>,
    cardId: string,
    action: string,
  ) => void;
}

const MoreOutlined = ({
  cardId,
  handleMultilist,
}: MoreOutLineProps): JSX.Element => {
  const [isClicked, setClicked] = useState(false);

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      setClicked(!isClicked);
    },
    [isClicked],
  );

  return (
    <>
      <Button aria-label="img-btn" onClick={onClick}>
        <img alt="moreOutlined" src={'/vertical_icon.png'}></img>
      </Button>
      {isClicked && (
        <Multilist handleMultilist={handleMultilist} cardId={cardId} />
      )}
    </>
  );
};
export default MoreOutlined;
