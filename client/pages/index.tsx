import { useState, useEffect, useRef } from 'react';
import Wrapper from './styles';
import Card from '../components/Card';
import fetcher from '../api/fetcher';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

interface CardItem {
  id: string;
  imgUrl: string;
}

type HomeProps = {
  cards: CardItem[];
};

const Home = ({ cards }: HomeProps): JSX.Element => {
  const [Pcards, setPcards] = useState(cards);
  const target = useRef(null);
  // const Intersecting = useInfiniteScroll(target);

  const getCards = async () => {
    const res = await fetcher('get', '/cards');
    setPcards([...Pcards, ...res]);
  };

  // useEffect(() => {
  //   if (Intersecting) getCards();
  // }, [Intersecting]);

  return (
    <Wrapper>
      <ul>
        {Pcards.map((data, index) => {
          return (
            <Card key={'card' + index} imgUrl={data.imgUrl} id={data.id}></Card>
          );
        })}
      </ul>
      {/* <div ref={target} style={{ height: '1px' }}></div> */}
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const cards = await fetcher('get', '/cards');
  return {
    props: { cards },
  };
};

export default Home;
