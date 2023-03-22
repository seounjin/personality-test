import { Container, Wrapper } from '../../features/tests/tests.styles';
import { GetServerSideProps } from 'next';
import withAuth from '../../hoc/withAuth';
import { setIsAuth } from '../../store/modules/auth';
import { setMode } from '../../store/modules/tests';
import Layout from '../../layout/Layout/Layout';
import { checkTestType } from '../../types/checkTestType';
import axiosServer from '../../api/axiosServer';
import { CustomError } from '../../errors';
import Stepper from '../../features/tests/container/Stepper/Stepper';
import { setScoreTestItems } from '../../features/tests/container/ScoreTestContainer/scoreTest.slice';
import { setMbtiTestItems } from '../../features/tests/container/MbtiTestContainer/mbtiTest.slice';
import { setBasicInformationItems } from '../../features/tests/container/BasicInformationForm/BasicInformationForm.slice';
import { setTrueOrFalseTestItems } from '../../features/tests/container/TrueOrFalseTestContainer/trueOrFalse.slice';

interface TestsPageProps {
  testType: string;
}

const TestsPage = ({ testType }: TestsPageProps): JSX.Element => {
  return (
    <Layout>
      <Container>
        <Wrapper>
          <Stepper testType={testType} />
        </Wrapper>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth({
  callback: async ({ auth, params, query, cookie, store, userId }) => {
    if (auth) {
      store.dispatch(setIsAuth({ isAuth: true, userId: userId }));
      const id = params.slug[0];
      const testType = query.test;

      try {
        if (!checkTestType(testType)) {
          throw new CustomError('잘못된 요청입니다', 400);
        }
        const res = await axiosServer('get', `/personality/${testType}/${id}`, {
          headers: { Cookie: cookie },
        });

        if (res.success) {
          store.dispatch(setMode({ mode: 'update' }));
          store.dispatch(setBasicInformationItems({ data: res.data }));
          if (testType === 'score') {
            store.dispatch(setScoreTestItems({ data: res.data }));
          } else if (testType === 'mbti') {
            store.dispatch(setMbtiTestItems({ data: res.data }));
          } else if (testType === 'true-or-false') {
            store.dispatch(setTrueOrFalseTestItems({ data: res.data }));
          }

          return { props: { testType: testType } };
        }
      } catch (error) {
        const { message, statusCode } = error;
        return {
          props: {
            error: {
              statusCode: statusCode || 'error',
              message: statusCode ? message : '잠시 후 다시 이용해주세요',
            },
          },
        };
      }
    }
    return {
      redirect: { destination: '/login?redirect=tests', permanent: false },
    };
  },
});

export default TestsPage;
