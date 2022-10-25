import React, { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../components/Modal';
import UserModalForm from '../components/UserModalForm';
import MoreOutlined from '../components/MoreOutlined/MoreOutlined';
import fetcher from '../api/fetcher';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import HomeBody from '../layout/Homebody/HomeBody';
import CardList from '../components/CardList/CardList';
import { Card } from '../components/CardList/CardList.type';

type HomeProps = {
  cardItems: Card[];
};

const Home = ({ cardItems }: HomeProps): JSX.Element => {
  const [Cards, setCards] = useState(cardItems);
  const [OpenModal, setOpenModal] = useState(false);
  const [SelectCard, setSelectCard] = useState(null);
  const [SelectAction, setSelectAction] = useState('');
  const target = useRef(null);
  // const Intersecting = useInfiniteScroll(target);

  const getCards = async () => {
    const res = await fetcher('get', '/cards');
    setCards([...Cards, ...res]);
  };

  const handleMultilist = useCallback((event, cardId, action) => {
    event.preventDefault();
    setSelectCard(cardId);
    setSelectAction(action);
    setOpenModal(true);
  }, []);

  const handleModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  // useEffect(() => {
  //   if (Intersecting) getCards();
  // }, [Intersecting]);

  return (
    <HomeBody>
      {Cards && <CardList cardItems={Cards} />}

      {OpenModal && (
        <Modal handleModal={handleModal}>
          <UserModalForm
            handleModal={handleModal}
            SelectCard={SelectCard}
            SelectAction={SelectAction}
          ></UserModalForm>
        </Modal>
      )}

      {/* <div ref={target} style={{ height: '1px' }}></div> */}
    </HomeBody>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { cards, status } = await fetcher('get', '/cards');
    if (status >= 500) {
      return {
        props: {
          error: {
            statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
            message: 'Error!',
          },
        },
      };
    }
    return {
      props: { cardItems: cards },
    };
  } catch (error) {
    return {
      props: {
        error: {
          statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
          message: 'Error!',
        },
      },
    };
  }
};

export default Home;
