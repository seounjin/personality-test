import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import UserModalForm from '../components/UserModalForm';
import MoreOutlined from '../components/MoreOutlined';
import fetcher from '../api/fetcher';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import HomeBody from '../layout/Homebody/Homebody';

interface CardItem {
  id: string;
  imgUrl: string;
  title: string;
}

type HomeProps = {
  cards: CardItem[];
};

const Home = ({ cards }: HomeProps): JSX.Element => {
  const [Cards, setCards] = useState(cards);
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
      <ul>
        {Cards &&
          Cards.map((data, index) => {
            return (
              <Card
                key={'card' + index}
                imgUrl={data.imgUrl}
                cardId={data.id}
                title={data.title}
                HeaderComponent={
                  <MoreOutlined
                    cardId={data.id}
                    handleMultilist={handleMultilist}
                  ></MoreOutlined>
                }
              ></Card>
            );
          })}
      </ul>
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
      props: { cards },
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
