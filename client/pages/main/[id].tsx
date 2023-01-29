import fetcher from '../../api/fetcher';
import {
  RawPersonalityItem,
  ResultItems,
  WeightedScore,
} from '../../features/personalityTest/personalityTest.types';
import { GetServerSideProps } from 'next';
import { useCallback, useState } from 'react';
import BackgroundImage from '../../features/personalityTest/components/BackgroundImage/BackgroundImage';
import LastScreen from '../../features/personalityTest/components/LastScreen/LastScreen';
import MainScreen from '../../features/personalityTest/components/MainScreen/MainScreen';
import StartScreen from '../../features/personalityTest/components/StartScreen/StartScreen';
import { useSlide } from '../../features/personalityTest/personalityTest.hook';
import { SCREEN_WIDTH } from '../../features/personalityTest/personalityTest.const';
import styled from 'styled-components';
import { SelectFormItems, WeightedScoreItem } from '../../types';
import { throttle } from 'lodash';

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
  const [personalityTest] = useState<SelectFormItems[]>(personalityItem);
  const [lastSlide] = useState<number>(personalityTest.length);
  const [weightedScore, setWeightedScore] = useState<WeightedScore>(
    weightedScoreDictionary,
  );
  const [resultItems, setResultItems] = useState<ResultItems | null>(null);
  const { slideRef, nextSlide, resetSlide } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const raseScore = (weightedScoreItems: WeightedScoreItem[]) => {
    for (const { typeContent, score } of weightedScoreItems) {
      weightedScore[typeContent] += score;
    }
    setWeightedScore({ ...weightedScore });
  };

  const optionsButtonClick = useCallback(
    throttle(
      (weightedScoreItems: WeightedScoreItem[], currentSlide): void => {
        raseScore(weightedScoreItems);
        if (currentSlide === lastSlide) {
          const res = getHighestScoreType();
          requestResult(res);
          return;
        }
        nextSlide();
      },
      1000,
      { leading: true, trailing: false },
    ),
    [],
  );

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
    const res = await fetcher('get', `/personality/${id}/results/${type}`);
    const { resultItems } = res.data;
    setResultItems(resultItems[0]);
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
                slideIndex={index}
                onClick={optionsButtonClick}
              />
            </BackgroundImage>
          ))}
          {resultItems && (
            <BackgroundImage>
              <LastScreen items={resultItems} onClick={reStartClick} />
            </BackgroundImage>
          )}
        </SlideWrapper>
      </HiddenWrapper>
    </Wrapper>
  );
};

const setWeightedScoreDictionary = (
  data: Array<WeightedScoreItem>,
): WeightedScore =>
  data.reduce((dic, { typeContent }) => ({ ...dic, [typeContent]: 0 }), {});

const parsedPersonalityItem = (data: RawPersonalityItem): MainPageProps => {
  const { title, explain, items, id } = data;
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

    const res = parsedPersonalityItem(data);

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
