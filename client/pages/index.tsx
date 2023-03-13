import React, { useState, useEffect, useRef } from 'react';
import Modal from '../components/Modal/Modal';
import fetcher from '../api/fetcher';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import HomeBody from '../layout/Homebody/HomeBody';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import { setIsAuth } from '../store/modules/auth';
import CardList from '../components/CardList/CardList';
import { Card } from '../components/CardList/CardList.type';
import withAuth from '../hoc/withAuth';
import Layout from '../layout/Layout/Layout';
import axiosServer from '../api/axiosServer';

const MCardList = React.memo(CardList);

type HomeProps = {
  cardItems: Card[];
};

const Home = ({ cardItems }: HomeProps): JSX.Element => {
  const [cards, setCards] = useState<Card[]>(cardItems);
  const target = useRef(null);
  const Intersecting = useInfiniteScroll(target);

  // const getCards = async () => {
  //   const res = await fetcher('get', '/personality');
  //   setCards([...cards, ...res]);
  // };

  // useEffect(() => {
  //   if (Intersecting) getCards();
  // }, [Intersecting]);

  return (
    <Layout>
      <HomeBody>
        {cards && <MCardList cardItems={cards} type="home" />}

        {/* <div ref={target} style={{ height: '1px' }}></div> */}
      </HomeBody>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, store, userId }) => {
    try {
      if (auth) {
        store.dispatch(setIsAuth({ isAuth: true, userId: userId }));
      }

      const res = await axiosServer('get', '/personality');

      return {
        props: { cardItems: res.data },
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
  },
});

export default Home;
