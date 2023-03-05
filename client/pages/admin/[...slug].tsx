import { Container } from '../../features/admin/admin.styles';
import StepperContainer from '../../features/admin/container/StepperContainer/StepperContainer';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import fetcher from '../../api/fetcher';
import { setIsAuth } from '../../store/modules/home';
import {
  setMbtiTypeTestItems,
  setMode,
  setScoreTypeTestItems,
} from '../../store/modules/admin';
import Layout from '../../layout/Layout/Layout';

interface AdminPageProps {
  testType: string;
}

const AdminPage = ({ testType }: AdminPageProps): JSX.Element => {
  return (
    <Layout>
      <Container>
        <StepperContainer testType={testType} />
      </Container>
    </Layout>
  );
};

const checkTestType = (testType) =>
  testType === 'score' || testType === 'mbti' || testType === 'true-or-false';

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, params, query, cookie, store }) => {
    if (auth) {
      store.dispatch(setIsAuth(true));
      const id = params.slug[0];
      const testType = query.test;

      if (!checkTestType(testType)) {
        return {
          props: {
            error: {
              statusCode: '404',
              message: '해당 페이지를 찾을 수 없습니다',
            },
          },
        };
      }

      const res = await fetcher('get', `/personality/${testType}/${id}`, {
        headers: { Cookie: cookie },
      });

      if (res.success) {
        store.dispatch(setMode({ mode: 'update' }));
        if (testType === 'score') {
          store.dispatch(setScoreTypeTestItems({ data: res.data }));
        } else if (testType === 'mbti') {
          store.dispatch(setMbtiTypeTestItems({ data: res.data }));
        }

        return { props: { testType: testType } };
      }

      if (res.status === 403) {
        return {
          props: {
            error: {
              statusCode: '죄송합니다. 접근할 수 없는 페이지입니다.',
              message: 'Error!',
            },
          },
        };
      }

      if (res.status >= 500) {
        return {
          props: {
            error: {
              statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
              message: 'Error!',
            },
          },
        };
      }

      return { props: {} };
    }
    return {
      redirect: { destination: '/login?redirect=admin', permanent: false },
    };
  },
});

export default AdminPage;
