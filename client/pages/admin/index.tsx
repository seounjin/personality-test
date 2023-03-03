import { Container } from '../../features/admin/admin.styles';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import { setIsAuth } from '../../store/modules/home';
import Layout from '../../layout/Layout/Layout';
import SelectTestType from '../../features/admin/container/SelectTestType/SelectTestType';
import StepperContainer from '../../features/admin/container/StepperContainer/StepperContainer';
import { useRouter } from 'next/router';
import { setIsSelectedTest } from '../../store/modules/admin';

const AdminPage = (): JSX.Element => {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        {router.query.test ? (
          <StepperContainer testType={router.query.test as string} />
        ) : (
          <SelectTestType />
        )}
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, store, query }) => {
    if (auth) {
      store.dispatch(setIsAuth(true));

      if (query.test) {
        store.dispatch(setIsSelectedTest({ isSelectedTest: true }));
      }

      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=admin', permanent: false },
    };
  },
});

export default AdminPage;
