import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import Aside from '../../features/mypage/container/Aside/Aside';
import TebPanel from '../../features/mypage/container/TabPanel/TabPanel';
import withAuth from '../../hoc/withAuth';

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
    <Wrapper>
      <Container>
        <Aside />
        <TebPanel />
      </Container>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async (auth: boolean) => {
    if (auth) {
      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=mypage', permanent: false },
    };
  },
});

export default MyPage;
