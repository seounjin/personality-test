import React, { useState } from 'react';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import fetcher from '../../../../api/fetcher';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';
import { MBTI_TEST_TYPE } from '../../tests.const';
import { useSlide } from '../../hooks/useSlide';
import {
  SelectFormItems,
  TestDisposition,
  WeightedScore,
  WeightedScoreItem,
} from '../../tests.types';
import { MbtiTestItems, MbtiTestResultFormItem } from './mbtiTest.type';

interface MbtiTestTypeProps {
  testItems: MbtiTestItems;
  testDisposition?: TestDisposition;
  mbtiResultItems?: MbtiTestResultFormItem[];
  handleCloseTemporaryTest?: () => void;
}

const MbtiTestType = ({
  testItems,
  mbtiResultItems,
  testDisposition = 'real',
  handleCloseTemporaryTest,
}: MbtiTestTypeProps): JSX.Element => {
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

  const [personalityTest] = useState<SelectFormItems[]>(personalityItems);
  const [lastSlide] = useState<number>(personalityTest.length);
  const [weightedScore, setWeightedScore] = useState<WeightedScore>(
    weightedScoreDictionary,
  );
  const [resultItems, setResultItems] = useState<MbtiTestResultFormItem | null>(
    null,
  );
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

  const setMbtiType = () =>
    MBTI_TEST_TYPE.reduce((type, item, index) => {
      const [aType, bType] = item;
      return (type +=
        weightedScore[aType] > weightedScore[bType] ? aType : bType);
    }, '');

  const optionsButtonClick = ({
    weightedScoreItems = [],
    currentSlide,
  }): void => {
    raseScore(weightedScoreItems);
    if (currentSlide === lastSlide) {
      const res = setMbtiType();
      if (testDisposition === 'real') {
        requestResult(res);
      } else {
        requestTempResult(res);
      }
      return;
    }
    nextSlide();
  };

  const requestTempResult = async (result: string) => {
    const res = mbtiResultItems.filter(({ mbtiType }) => mbtiType === result);
    setResultItems(res[0]);
    nextSlide();
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

  const reStartClick = (): void => {
    resetSlide();
    setWeightedScore(weightedScoreDictionary);
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
        <BackgroundImage>
          <LastScreen
            resultContent={resultItems.resultContent}
            explanationContent={resultItems.explanationContent}
            subTitle={resultItems.mbtiType}
            isPublic={isPublic}
            onClick={reStartClick}
            onClose={handleCloseTemporaryTest}
          />
        </BackgroundImage>
      )}
    </SlideWrapper>
  );
};

export default MbtiTestType;
