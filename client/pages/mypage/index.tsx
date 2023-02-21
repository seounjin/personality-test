import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import fetcher from '../../api/fetcher';
import Aside from '../../features/mypage/container/Aside/Aside';
import TebPanel from '../../features/mypage/container/TabPanel/TabPanel';
import withAuth from '../../hoc/withAuth';
import Layout from '../../layout/Layout/Layout';
import { setIsAuth } from '../../store/modules/home';
import { setCards, setUser } from '../../store/modules/mypage';

export const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.mypageBackgroundColor};
  padding-top: 50px;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
`;

const MyPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <Aside />
          <TebPanel />
        </Container>
      </Wrapper>
    </Layout>
  );
};

const getCards = async (cookie) => {
  const headers = {
    Cookie: cookie,
  };
  return await fetcher('get', '/personality/my-personality', { headers });
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, store, cookie }) => {
    if (auth) {
      store.dispatch(setIsAuth(true));

      const res = await getCards(cookie);
      store.dispatch(setCards(res.data));
      store.dispatch(setUser(res.user));

      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=mypage', permanent: false },
    };
  },
});

export default MyPage;
