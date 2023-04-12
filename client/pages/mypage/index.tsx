import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import Aside from '../../features/mypage/container/Aside/Aside';
import TebPanel from '../../features/mypage/container/TabPanel/TabPanel';
import withAuth from '../../hoc/withAuth';
import Layout from '../../layout/Layout/Layout';
import { setIsAuth } from '../../store/modules/auth';

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.mypageBackgroundColor};
  padding-top: 50px;
`;

export const Container = styled.div`
  max-width: 1280px;
  height: 100%;
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

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, store, cookie, userId }) => {
    if (auth) {
      store.dispatch(setIsAuth({ isAuth: true, userId: userId }));
      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=mypage', permanent: false },
    };
  },
});

export default MyPage;
