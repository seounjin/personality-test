import React, { useState, useEffect, useRef, useCallback } from 'react';
import Wrapper from './styles';
import Card from '../components/Card';
import ModalContainer from '../components/ModalContainer';
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
  const [SelectCard, setSelectCard] = useState(null);
  const [SelectAction, setSelectAction] = useState('');
  const target = useRef(null);
  // const Intersecting = useInfiniteScroll(target);

  const getCards = async () => {
    const res = await fetcher('get', '/cards');
    setPcards([...Pcards, ...res]);
  };

  const handleModal = useCallback(
    (event, cardId, action) => {
      event.preventDefault();
      console.log('cardid', cardId);
      setSelectCard(cardId);
      setSelectAction(action);
      setOpenModal(!OpenModal);
    },
    [OpenModal, SelectCard],
  );

  // useEffect(() => {
  //   if (Intersecting) getCards();
  // }, [Intersecting]);

  return (
    <Wrapper>
      <ul>
        {Pcards &&
          Pcards.map((data, index) => {
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
      {OpenModal && (
        <ModalContainer
          handleModal={handleModal}
          SelectCard={SelectCard}
          SelectAction={SelectAction}
        ></ModalContainer>
      )}
      {/* <div ref={target} style={{ height: '1px' }}></div> */}
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { cards } = await fetcher('get', '/cards');
    return {
      props: { cards },
    };
  } catch (error) {
    return {
      props: {
        error: { statusCode: 503, message: 'Error!' },
      },
    };
  }
};

export default Home;
