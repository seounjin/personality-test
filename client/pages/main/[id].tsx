import fetcher from '../../api/fetcher';
import {
  MbtiTestItems,
  ScoreTestItems,
} from '../../features/personalityTest/personalityTest.types';
import { GetServerSideProps } from 'next';
import { MBTI_TEST_TYPE_CONTENT } from '../../features/personalityTest/personalityTest.const';
import MbtiTestType from '../../features/personalityTest/container/MbtiTypeTest/MbtiTestType';
import ScoreTypeTest from '../../features/personalityTest/container/ScoreTypeTest/ScoreTypeTest';
import MainPageLayout from '../../layout/MainPageLayout/MainPageLayout';

interface MainPageProps {
  testItems: ScoreTestItems | MbtiTestItems;
}

const testList = (testType, testItems) => {
  switch (testType) {
    case 'score':
      return <ScoreTypeTest testItems={testItems} />;
    case 'mbti':
      return <MbtiTestType testItems={testItems} />;
  }
};

const MainPage = ({ testItems }: MainPageProps): JSX.Element => {
  return (
    <MainPageLayout>{testList(testItems.testType, testItems)}</MainPageLayout>
  );
};

const setWeightedScoreDictionary = (data) =>
  data.reduce((dic, { typeContent }) => ({ ...dic, [typeContent]: 0 }), {});

const weightedScoreDictionary = (testType, selectItems) => {
  if (testType === 'score') {
    return setWeightedScoreDictionary(
      selectItems[0].optionItems[0].weightedScoreItems,
    );
  } else if (testType === 'mbti') {
    return setWeightedScoreDictionary(MBTI_TEST_TYPE_CONTENT);
  }
  return {};
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  // 이상한 쿼리 차단
  console.log('쿼리', query);

  const { test, id: parmsId } = query;
  try {
    const cookie = req.headers.cookie;
    const headers = cookie
      ? {
          Cookie: cookie,
        }
      : {};

    const { status, data } = await fetcher(
      'get',
      `/personality/${parmsId}?test=${test}`,
      {
        headers,
      },
    );

    console.log('상태', status);

    if (status === 401 || status === 403) {
      return {
        props: {
          error: {
            statusCode: '접근할 수 없는 페이지입니다',
            message: 'Error!',
          },
        },
      };
    }

    if (status === 404) {
      return {
        props: {
          error: {
            statusCode: '찾으시려는 페이지는 없는 페이지입니다',
            message: 'Error!',
          },
        },
      };
    }
    const {
      basicInformationItems: { title, explain },
      id: testTypeId,
      testType,
      selectItems,
    } = data;

    return {
      props: {
        testItems: {
          id: testTypeId,
          title: title,
          explain: explain,
          testType: testType,
          personalityItems: [...selectItems],
          weightedScoreDictionary: weightedScoreDictionary(
            testType,
            selectItems,
          ),
        },
      },
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
};

export default MainPage;
