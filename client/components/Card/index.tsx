import React from 'react';
import Wrapper from './styles';
import Link from 'next/link';

interface CardProps {
  imgUrl: string;
  cardId: string;
  title: string;
  HeaderComponent: JSX.Element;
}

const Card = ({
  imgUrl,
  cardId,
  title,
  HeaderComponent,
}: CardProps): JSX.Element => {
  return (
    <Wrapper imgUrl={imgUrl}>
      <Link
        href={{
          pathname: `/main/${cardId}`,
        }}
      >
        <a>
          <div>
            <div className="card_header">{HeaderComponent}</div>
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
