import React, { useState } from 'react';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import fetcher from '../../../../api/fetcher';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';
import { useSlide } from '../../hooks/useSlide';
import { TestDisposition } from '../../tests.types';
import {
  TrueOrFalseTestItems,
  TrueOrFalseTestResultFormItem,
  TrueOrFalseTestSelectFormItem,
} from './trueOrFalseTest.type';

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
    console.log('결과', selectedOtioin, result);

    console.log('res', trueOrFalseResultItems);
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

  const reStartClick = (): void => {
    resetSlide();
    setSelectedOption('');
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
