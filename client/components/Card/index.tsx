import React, { useState, useCallback } from 'react';
import Wrapper from './styles';
import MoreOutlined from '../MoreOutlined';
import Multilist from '../Multilist';
import Link from 'next/link';

type CardProps = {
  imgUrl: string;
  id: string;
  title: string;
  handleModal: (
    event?: React.MouseEvent<HTMLElement>,
    cardId?: string,
    action?: string,
  ) => void;
};

const Card = ({ imgUrl, id, title, handleModal }: CardProps): JSX.Element => {
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
          pathname: `/main/${id}`,
        }}
      >
        <a>
          <div>
            <div className="card_header">
              <MoreOutlined onClick={onClick} />
              {isClicked && <Multilist handleModal={handleModal} cardId={id} />}
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
