import React from 'react';
import Wrapper from './styles';
import Link from 'next/link';

type CardProps = {
  imgUrl: string;
  id: string;
};

const Card = ({ imgUrl, id }: CardProps): JSX.Element => {
  return (
    <Wrapper imgUrl={imgUrl}>
      <Link href={`/main/${id}`}>
        <a>
          <div>
            <div className="card_header"></div>
            <div className="card_body">
              <h1>성향 테스트</h1>
            </div>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export default React.memo(Card);
