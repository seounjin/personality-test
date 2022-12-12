import fetcher from '../../api/fetcher';
import {
  MainProps,
  PersonalityTest,
  ResultData,
} from '../../features/personalityTest/personalityTest.types';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useState } from 'react';
import BackgroundImage from '../../features/personalityTest/components/BackgroundImage/BackgroundImage';
import LastScreen from '../../features/personalityTest/components/LastScreen/LastScreen';
import MainScreen from '../../features/personalityTest/components/MainScreen/MainScreen';
import StartScreen from '../../features/personalityTest/components/StartScreen/StartScreen';
import { useSlide } from '../../features/personalityTest/personalityTest.hook';
import { SCREEN_WIDTH } from '../../features/personalityTest/personalityTest.const';
import styled from 'styled-components';

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

type Params = { id: string };

const MainPage = ({
  data: { testData, title, id },
}: MainProps): JSX.Element => {
  const [personalityTest] = useState<PersonalityTest[]>(testData);
  const [lastSlide] = useState<number>(personalityTest.length);
  const [options, setOptions] = useState<string>('');
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const { slideRef, currentSlide, nextSlide, resetSlide } = useSlide();

  const startClick = (): void => {
    nextSlide();
  };

  const combineOptions = (optionId: string) => {
    return optionId === '1'
      ? options + personalityTest[currentSlide - 1].select_1_id
      : options + personalityTest[currentSlide - 1].select_2_id;
  };

  const optionsButtonClick = (event): void => {
    const optionId: string = event.target.dataset.id;
    const sumId: string = combineOptions(optionId);
    setOptions(sumId);

    if (currentSlide === lastSlide) {
      requestResult(sumId);
    }
  };

  const requestResult = async (sumId: string) => {
    try {
      const res = await fetcher('get', `/tests/${id}/results/${sumId}`);
      setResultData(res.resultData[0]);
      nextSlide();
    } catch (error) {
      console.log('결과요청 페이지 에러', error);
    }
  };

  const reStartClick = (): void => {
    setOptions('');
    resetSlide();
  };

  return (
    <Wrapper>
      <HiddenWrapper>
        <SlideWrapper ref={slideRef}>
          <BackgroundImage>
            <StartScreen title={title} onClick={startClick} />
          </BackgroundImage>

          {personalityTest.map((data: PersonalityTest, index: number) => (
            <BackgroundImage key={`p${index}`}>
              <MainScreen
                question={data.question}
                select_1={data.select_1}
                select_2={data.select_2}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array(100)
    .fill(0)
    .map((_, index) => ({
      params: { id: `${index + 1}` },
    }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<MainProps, Params> = async ({
  params: { id },
}) => {
  try {
    const res = await fetcher('get', `/tests/${id}`);

    const { testData, title, status } = res;
    if (status) {
      return {
        props: {
          error: { statusCode: status, message: 'Error!' },
        },
      };
    }
    return {
      props: { data: { testData: testData, title: title, id } },
    };
  } catch (error) {
    return {
      props: {
        error: { statusCode: 500, message: 'Error!' },
      },
    };
  }
};

export default MainPage;
