import React, { useCallback, useState } from 'react';
import { SelectFormItems, WeightedScoreItem } from '../../../../types';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import { MBTI_TEST_TYPE } from '../../personalityTest.const';
import { useSlide } from '../../personalityTest.hook';
import {
  WeightedScore,
  ResultItems,
  MbtiTestItems,
} from '../../personalityTest.types';
import { throttle } from 'lodash';
import fetcher from '../../../../api/fetcher';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';

interface MbtiTestTypeProps {
  testItems: MbtiTestItems;
}

const MbtiTestType = ({ testItems }: MbtiTestTypeProps): JSX.Element => {
  const {
    id,
    title,
    subTitle,
    explain,
    isPublic,
    weightedScoreDictionary,
    personalityItems,
  } = testItems;

  const [personalityTest] = useState<SelectFormItems[]>(personalityItems);
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

  const setMbtiType = () =>
    MBTI_TEST_TYPE.reduce((type, item, index) => {
      const [aType, bType] = item;
      return (type +=
        weightedScore[aType] > weightedScore[bType] ? aType : bType);
    }, '');

  const optionsButtonClick = useCallback(
    throttle(
      (weightedScoreItems: WeightedScoreItem[], currentSlide): void => {
        raseScore(weightedScoreItems);
        if (currentSlide === lastSlide) {
          const res = setMbtiType();
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

  const requestResult = async (type: string) => {
    const res = await fetcher('get', `/personality/${id}/results/${type}`);
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
          />
        </BackgroundImage>
      ))}
      {resultItems && (
        <BackgroundImage>
          <LastScreen
            items={resultItems}
            isPublic={isPublic}
            onClick={reStartClick}
          />
        </BackgroundImage>
      )}
    </SlideWrapper>
  );
};

export default MbtiTestType;
