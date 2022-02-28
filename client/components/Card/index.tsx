import React from 'react';
import Wrapper from './styles';

type CardProps = {
  imgUrl: string;
};

const Card = ({ imgUrl }: CardProps): JSX.Element => {
  return (
    <Wrapper imgUrl={imgUrl}>
      <div>
        <div className="card_header"></div>
        <div className="card_body">
          <h1>성향 테스트</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default React.memo(Card);
