import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import HomeBody from '../layout/Homebody/HomeBody';
import { setIsAuth } from '../store/modules/auth';
import { Card } from '../components/CardList/CardList.type';
import withAuth from '../hoc/withAuth';
import Layout from '../layout/Layout/Layout';
import axiosServer from '../api/axiosServer';
import dynamic from 'next/dynamic';
import CardListSkeleton from '../components/CardList/CardListSkeleton';
import Seo from '../components/Seo/Seo';

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

  const CardList = dynamic(() => import('../components/CardList/CardList'), {
    ssr: true,
    loading: () => <CardListSkeleton CardListLength={cards.length} />,
  });

  return (
    <>
      <Seo
        title={`성향 테스트`}
        altImage={`성향테스트 아이콘`}
        description={
          '각양각색의 사람들의 성향을 테스트 할 수 있는 폼을 제공해주는 서비스입니다.'
        }
        ogImageUrl={'https://rororo-marshmallow.store/api/og'}
        ogTitle={'성향 테스트'}
        ogDescription={'성향테스트를 만들고 공유할수 있어요.'}
      />
      <Layout>
        <HomeBody>
          <CardList cardItems={cards} />
          {/* <div ref={target} style={{ height: '1px' }}></div> */}
        </HomeBody>
      </Layout>
    </>
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
