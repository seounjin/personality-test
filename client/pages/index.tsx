import { useState, useEffect, useRef, useCallback } from 'react';
import Wrapper from './styles';
import Card from '../components/Card';
import Modal from '../components/Modal';
import fetcher from '../api/fetcher';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { title } from 'process';

interface CardItem {
  id: string;
  imgUrl: string;
  title: string;
}

type HomeProps = {
  cards: CardItem[];
};

const Home = ({ cards }: HomeProps): JSX.Element => {
  const [Pcards, setPcards] = useState(cards);
  const [OpenModal, setOpenModal] = useState(false);
  const target = useRef(null);
  // const Intersecting = useInfiniteScroll(target);

  const getCards = async () => {
    const res = await fetcher('get', '/cards');
    setPcards([...Pcards, ...res]);
  };

  const handleModal = useCallback(() => {
    setOpenModal(!OpenModal);
  }, []);

  // useEffect(() => {
  //   if (Intersecting) getCards();
  // }, [Intersecting]);

  return (
    <Wrapper>
      <ul>
        {Pcards.map((data, index) => {
          return (
            <Card
              key={'card' + index}
              imgUrl={data.imgUrl}
              id={data.id}
              title={data.title}
              handleModal={handleModal}
            ></Card>
          );
        })}
      </ul>
      {/* {OpenModal && <Modal handleModal={handleModal}></Modal>} */}
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
