import React, { useState, useCallback } from 'react';
import Wrapper from './styles';
import MoreOutlined from '../MoreOutlined';
import Multilist from '../Multilist';
import Link from 'next/link';

type CardProps = {
  imgUrl: string;
  cardId: string;
  title: string;
  handleMultilist: (
    event?: React.MouseEvent<HTMLElement>,
    cardId?: string,
    action?: string,
  ) => void;
};

const Card = ({
  imgUrl,
  cardId,
  title,
  handleMultilist,
}: CardProps): JSX.Element => {
  const [isClicked, setClicked] = useState(false);

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      setClicked(!isClicked);
    },
    [isClicked],
  );

  return (
    <Wrapper imgUrl={imgUrl}>
      <Link
        href={{
          pathname: `/main/${cardId}`,
        }}
      >
        <a>
          <div>
            <div className="card_header">
              <MoreOutlined onClick={onClick} />
              {isClicked && (
                <Multilist handleMultilist={handleMultilist} cardId={cardId} />
              )}
            </div>
            <div className="card_body">
              <h1>{title}</h1>
            </div>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export default React.memo(Card);
