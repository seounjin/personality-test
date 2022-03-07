import React from 'react';
import Wrapper from './styles';
import MoreOutlined from '../MoreOutlined';
import Link from 'next/link';

type CardProps = {
  imgUrl: string;
  id: string;
  title: string;
  handleModal: () => void;
};

const Card = ({ imgUrl, id, title, handleModal }: CardProps): JSX.Element => {
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
              <MoreOutlined handleModal={handleModal} />
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
