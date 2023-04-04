import { GetServerSideProps } from 'next';
import MainPageLayout from '../../layout/MainPageLayout/MainPageLayout';
import axiosServer from '../../api/axiosServer';
import { checkTestType } from '../../types/checkTestType';
import { CustomError } from '../../errors';
import MbtiTestType from '../../features/tests/container/MbtiTestContainer/MbtiTestType';
import ScoreTypeTest from '../../features/tests/container/ScoreTestContainer/ScoreTypeTest';
import TrueOrFalseTypeTest from '../../features/tests/container/TrueOrFalseTestContainer/TrueOrFalseTypeTest';
import { MBTI_TEST_TYPE_CONTENT } from '../../features/tests/tests.const';
import { MbtiTestItems } from '../../features/tests/container/MbtiTestContainer/mbtiTest.type';
import { ScoreTestItems } from '../../features/tests/container/ScoreTestContainer/scoreTest.type';
import { setWeightedScoreDictionary } from '../../features/tests/tests.util';
import { TrueOrFalseTestItems } from '../../features/tests/container/TrueOrFalseTestContainer/trueOrFalseTest.type';

interface MainPageProps {
  testItems: ScoreTestItems | MbtiTestItems | TrueOrFalseTestItems;
}

const testList = (testType, testItems) => {
  switch (testType) {
    case 'score':
      return <ScoreTypeTest testItems={testItems} />;
    case 'mbti':
      return <MbtiTestType testItems={testItems} />;
    case 'true-or-false':
      return <TrueOrFalseTypeTest testItems={testItems} />;
  }
};

const MainPage = ({ testItems }: MainPageProps): JSX.Element => {
  return (
    <MainPageLayout>{testList(testItems.testType, testItems)}</MainPageLayout>
  );
};

const weightedScoreDictionary = (testType, selectItems) => {
  if (testType === 'score') {
    return {
      weightedScoreDictionary: setWeightedScoreDictionary(
        selectItems[0].optionItems[0].weightedScoreItems,
      ),
    };
  } else if (testType === 'mbti') {
    return {
      weightedScoreDictionary: setWeightedScoreDictionary(
        MBTI_TEST_TYPE_CONTENT,
      ),
    };
  }
  return {};
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { test, id: parmsId } = query;
  try {
    if (!checkTestType(test)) {
      throw new CustomError('잘못된 요청입니다', 400);
    }
    const cookie = req.headers.cookie;
    const headers = cookie
      ? {
          Cookie: cookie,
        }
      : {};

    const res = await axiosServer(
      'get',
      `/personality/${parmsId}?test=${test}`,
      {
        headers,
      },
    );

    if (res.success) {
      const {
        basicInformationItems: { title, subTitle, explain },
        id: testTypeId,
        testType,
        selectItems,
        isPublic,
      } = res.data;

      return {
        props: {
          testItems: {
            id: testTypeId,
            title: title,
            subTitle: subTitle,
            explain: explain,
            testType: testType,
            isPublic: isPublic,
            personalityItems: [...selectItems],
            ...weightedScoreDictionary(testType, selectItems),
          },
        },
      };
    }
    return { props: {} };
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
};

export default MainPage;
