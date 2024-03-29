import React, { useRef, useState } from 'react';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';
import { useSlide } from '../../hooks/useSlide';
import { TestDisposition } from '../../tests.types';
import {
  TrueOrFalseTestItems,
  TrueOrFalseTestResultFormItem,
  TrueOrFalseTestSelectFormItem,
} from './trueOrFalseTest.type';
import { useFetcher } from '../../../../hooks/useFetcher';

interface TrueOrFalseTypeTestProps {
  testItems: TrueOrFalseTestItems;
  testDisposition?: TestDisposition;
  trueOrFalseResultItems?: TrueOrFalseTestResultFormItem[];
  handleCloseTemporaryTest?: () => void;
}

const TrueOrFalseTypeTest = ({
  testItems,
  testDisposition = 'real',
  trueOrFalseResultItems,
  handleCloseTemporaryTest,
}: TrueOrFalseTypeTestProps): JSX.Element => {
  const { id, title, subTitle, testType, isPublic, personalityItems } =
    testItems;

  const fetcher = useFetcher();

  const [personalityTest] =
    useState<TrueOrFalseTestSelectFormItem[]>(personalityItems);
  const [lastSlide] = useState<number>(personalityTest.length);

  const [resultItems, setResultItems] =
    useState<TrueOrFalseTestResultFormItem | null>(null);
  const [selectedOtioin, setSelectedOption] = useState<string>('');

  const { slideRef, nextSlide, resetSlide, isTransitioning } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const optionsButtonClick = ({ currentSlide, optionNumber }): void => {
    setSelectedOption((selectedOtioin) => selectedOtioin + `${optionNumber}`);
    if (currentSlide === lastSlide) {
      if (testDisposition === 'real') {
        requestResult(selectedOtioin + `${optionNumber}`);
      } else {
        requestTempResult(selectedOtioin + `${optionNumber}`);
      }
      return;
    }
    nextSlide();
  };

  const requestTempResult = async (result: string) => {
    const res = trueOrFalseResultItems.filter(
      ({ selectedOptionNumber }) => selectedOptionNumber === result,
    );

    setResultItems(res[0]);
    nextSlide();
  };

  const requestResult = async (result) => {
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

  const lastBackgroundImgRef = useRef(null);

  const reStartClick = (): void => {
    resetSlide();
    setResultItems(null);
    setSelectedOption('');
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
            resultContent={resultItems.resultContent}
            explanationContent={resultItems.explanationContent}
            resultImageUrl={resultItems.resultImageUrl}
            isPublic={isPublic}
            onClick={reStartClick}
            onClose={handleCloseTemporaryTest}
          />
        </BackgroundImage>
      )}
    </SlideWrapper>
  );
};

export default TrueOrFalseTypeTest;
