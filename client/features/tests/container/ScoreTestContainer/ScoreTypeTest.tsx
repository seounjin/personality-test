import React, { useRef, useState } from 'react';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';
import { useSlide } from '../../hooks/useSlide';
import { ScoreTestItems, ScoreTestResultFormItem } from './scoreTest.type';
import {
  SelectFormItems,
  TestDisposition,
  WeightedScore,
  WeightedScoreItem,
} from '../../tests.types';
import { useFetcher } from '../../../../hooks/useFetcher';

interface ScoreTypeTestProps {
  testItems: ScoreTestItems;
  testDisposition?: TestDisposition;
  scoreResultItems?: ScoreTestResultFormItem[];
  handleCloseTemporaryTest?: () => void;
}

const ScoreTypeTest = ({
  testItems,
  scoreResultItems,
  testDisposition = 'real',
  handleCloseTemporaryTest,
}: ScoreTypeTestProps): JSX.Element => {
  const {
    id,
    title,
    subTitle,
    explain,
    testType,
    isPublic,
    weightedScoreDictionary,
    personalityItems,
  } = testItems;
  const fetcher = useFetcher();

  const [personalityTest] = useState<SelectFormItems[]>(personalityItems);
  const [lastSlide] = useState<number>(personalityTest.length);
  const [weightedScore, setWeightedScore] = useState<WeightedScore>(
    weightedScoreDictionary,
  );
  const [resultItems, setResultItems] =
    useState<ScoreTestResultFormItem | null>(null);
  const { slideRef, nextSlide, resetSlide, isTransitioning } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const raseScore = (weightedScoreItems: WeightedScoreItem[]) => {
    for (const { resultContent, score } of weightedScoreItems) {
      weightedScore[resultContent] += score;
    }
    setWeightedScore({ ...weightedScore });
  };

  const optionsButtonClick = ({ weightedScoreItems, currentSlide }): void => {
    raseScore(weightedScoreItems);
    if (currentSlide === lastSlide) {
      const res = getHighestScoreType();
      if (testDisposition === 'real') {
        requestResult(res);
      } else {
        requestTempResult(res);
      }
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

  const requestResult = async (result: string) => {
    const res = await fetcher(
      'get',
      `/personality/${id}/${testType}/results/${result}`,
    );
    if (res.success) {
      const { resultItems } = res.data;
      setResultItems(resultItems[0]);
      nextSlide();
    } else {
      alert('서버 점검중입니다.\n잠시 후 다시 시도해주세요');
    }
  };

  const requestTempResult = async (result: string) => {
    const res = scoreResultItems.filter(
      ({ resultContent }) => resultContent === result,
    );
    setResultItems(res[0]);
    nextSlide();
  };

  const lastBackgroundImgRef = useRef(null);

  const reStartClick = (): void => {
    resetSlide();
    setWeightedScore(weightedScoreDictionary);
    lastBackgroundImgRef.current.scrollTop = 0;
  };

  return (
    <SlideWrapper ref={slideRef}>
      <BackgroundImage>
        <StartScreen title={title} subTitle={subTitle} onClick={startClick} />
      </BackgroundImage>

      {personalityTest.map(({ question, optionItems }, index: number) => (
        <BackgroundImage key={`p${index}`}>
          <MainScreen
            question={question}
            optionItems={optionItems}
            slideIndex={index}
            totalStep={personalityTest.length}
            onClick={optionsButtonClick}
            isTransitioning={isTransitioning}
          />
        </BackgroundImage>
      ))}
      {resultItems && (
        <BackgroundImage ref={lastBackgroundImgRef}>
          <LastScreen
            isPublic={isPublic}
            onClick={reStartClick}
            onClose={handleCloseTemporaryTest}
            resultContent={resultItems.resultContent}
            explanationContent={resultItems.explanationContent}
            resultImageUrl={
              resultItems.resultImageUrl ? resultItems.resultImageUrl : ''
            }
          />
        </BackgroundImage>
      )}
    </SlideWrapper>
  );
};

export default ScoreTypeTest;
