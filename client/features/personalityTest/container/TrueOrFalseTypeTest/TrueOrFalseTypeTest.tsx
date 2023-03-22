import React, { useCallback, useState } from 'react';
import { SelectFormItems } from '../../../../types';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import LastScreen from '../../components/LastScreen/LastScreen';
import MainScreen from '../../components/MainScreen/MainScreen';
import StartScreen from '../../components/StartScreen/StartScreen';
import { useSlide } from '../../personalityTest.hook';
import { ResultItems } from '../../personalityTest.types';
import { throttle } from 'lodash';
import fetcher from '../../../../api/fetcher';
import SlideWrapper from '../../components/SlideWrapper/SlideWrapper';

interface TrueOrFalseTypeTestProps {
  testItems: any;
}

const TrueOrFalseTypeTest = ({
  testItems,
}: TrueOrFalseTypeTestProps): JSX.Element => {
  const { id, title, subTitle, testType, isPublic, personalityItems } =
    testItems;

  const [personalityTest] = useState<SelectFormItems[]>(personalityItems);
  const [lastSlide] = useState<number>(personalityTest.length);

  const [resultItems, setResultItems] = useState<ResultItems | null>(null);
  const [selectedOtioin, setSelectedOption] = useState('');

  const { slideRef, nextSlide, resetSlide } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const optionsButtonClick = useCallback(
    throttle(
      ({ currentSlide, optionNumber }): void => {
        setSelectedOption(selectedOtioin + `${optionNumber}`);
        if (currentSlide === lastSlide) {
          requestResult(selectedOtioin + `${optionNumber}`);
          return;
        }
        nextSlide();
      },
      1000,
      { leading: true, trailing: false },
    ),
    [],
  );

  const requestResult = async (result) => {
    console.log('투지', selectedOtioin, testType);
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

export default TrueOrFalseTypeTest;
