import { Container } from '../../features/tests/tests.styles';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import { setIsAuth } from '../../store/modules/home';
import Layout from '../../layout/Layout/Layout';
import SelectTestType from '../../features/tests/container/SelectTestType/SelectTestType';
import StepperContainer from '../../features/tests/container/StepperContainer/StepperContainer';
import { useRouter } from 'next/router';
import { setIsSelectedTest } from '../../store/modules/tests';

const TestsPage = (): JSX.Element => {
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
      redirect: { destination: '/login?redirect=tests', permanent: false },
    };
  },
});

export default TestsPage;
