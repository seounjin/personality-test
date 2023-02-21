import { Wrapper, Container } from '../../features/admin/admin.styles';
import Stepper from '../../features/admin/container/Stepper/Stepper';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import { setIsAuth } from '../../store/modules/home';
import Layout from '../../layout/Layout/Layout';

const AdminPage = (): JSX.Element => {
  return (
    <Layout>
      <Wrapper>
        <Container>
          <Stepper />
        </Container>
      </Wrapper>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, store }) => {
    if (auth) {
      store.dispatch(setIsAuth(true));

      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=admin', permanent: false },
    };
  },
});

export default AdminPage;
