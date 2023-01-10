import fetcher from '../../api/fetcher';
import {
  PersonalityTest,
  ResultData,
} from '../../features/personalityTest/personalityTest.types';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import BackgroundImage from '../../features/personalityTest/components/BackgroundImage/BackgroundImage';
import LastScreen from '../../features/personalityTest/components/LastScreen/LastScreen';
import MainScreen from '../../features/personalityTest/components/MainScreen/MainScreen';
import StartScreen from '../../features/personalityTest/components/StartScreen/StartScreen';
import { useSlide } from '../../features/personalityTest/personalityTest.hook';
import { SCREEN_WIDTH } from '../../features/personalityTest/personalityTest.const';
import styled from 'styled-components';
import { SelectFormItems } from '../../types';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const HiddenWrapper = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  width: ${SCREEN_WIDTH};
  display: flex;
`;

interface WeightedScore {
  [key: string]: number;
}

interface MainPageProps {
  id: string;
  title: string;
  explain: string;
  weightedScoreDictionary: WeightedScore;
  personalityItem: SelectFormItems[];
}

const MainPage = ({
  id,
  title,
  explain,
  weightedScoreDictionary,
  personalityItem,
}: MainPageProps): JSX.Element => {
  const [personalityTest] = useState(personalityItem);
  const [lastSlide] = useState<number>(personalityTest.length);
  const [weightedScore, setWeightedScore] = useState(weightedScoreDictionary);
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const { slideRef, currentSlide, nextSlide, resetSlide } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const raseScore = (weightedScoreItems) => {
    for (const { typeContent, score } of weightedScoreItems) {
      weightedScore[typeContent] += score;
    }
    setWeightedScore({ ...weightedScore });
  };

  const optionsButtonClick = (event, weightedScoreItems): void => {
    raseScore(weightedScoreItems);
    if (currentSlide === lastSlide) {
      const res = getHighestScoreType();
      requestResult(res);
      return;
    }
    nextSlide();
  };
  const getHighestScoreType = (): string => {
    const sortedWeightScore = Object.entries(weightedScore).sort(
      ([, a], [, b]) => (a > b ? -1 : 1),
    );
    const [, sortedValue] = sortedWeightScore[0];

    const shuffleWeightScore = sortedWeightScore
      .reduce(
        (array, [key, value]) =>
          sortedValue === value ? [...array, key] : array,
        [],
      )
      .sort(() => Math.random() - 0.5);

    return shuffleWeightScore[0];
  };

  const requestResult = async (type: string) => {
    const res = await fetcher('get', `/personality/${type}/results`);
    // setResultData(res.resultData[0]);
    nextSlide();
  };

  const reStartClick = (): void => {
    resetSlide();
    setWeightedScore(weightedScoreDictionary);
  };

  return (
    <Wrapper>
      <HiddenWrapper>
        <SlideWrapper ref={slideRef}>
          <BackgroundImage>
            <StartScreen title={title} onClick={startClick} />
          </BackgroundImage>

          {personalityTest.map(({ question, optionItems }, index: number) => (
            <BackgroundImage key={`p${index}`}>
              <MainScreen
                question={question}
                optionItems={optionItems}
                onClick={optionsButtonClick}
              />
            </BackgroundImage>
          ))}
          {resultData && (
            <BackgroundImage>
              <LastScreen data={resultData} onClick={reStartClick} />
            </BackgroundImage>
          )}
        </SlideWrapper>
      </HiddenWrapper>
    </Wrapper>
  );
};

const setWeightedScoreDictionary = (data) =>
  data.reduce((dic, { typeContent }) => ({ ...dic, [typeContent]: 0 }), {});

const parsedPersonalityItem = (data, id) => {
  const { title, explain, items } = data;
  const { selectItems } = items[0];

  return {
    id: id,
    title: title,
    explain: explain,
    weightedScoreDictionary: setWeightedScoreDictionary(
      selectItems[0].optionItems[0].weightedScoreItems,
    ),
    personalityItem: [...selectItems],
  };
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  try {
    const { status, data } = await fetcher('get', `/personality/${id}`);

    const res = parsedPersonalityItem(data, id);

    if (status >= 500) {
      return {
        props: {
          error: {
            statusCode: '죄송합니다. 잠시 후 다시 이용해 주세요.',
            message: 'Error!',
          },
        },
      };
    }
    return {
      props: res,
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
