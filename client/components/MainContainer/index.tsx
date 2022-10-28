import { useState, useEffect } from 'react';
import StartScreen from './StartScreen/StartScreen';
import QuestionImg from './QuestionImg';
import Main from './Main';
import LastScreen from './LastScreen';
import fetcher from '../../api/fetcher';
import { TestData, LastScreenData, MainProps } from './types';
import Wrapper from './styles';

const MainContainer = ({
  mainStaticData: { testData, title, id },
}: MainProps): JSX.Element => {
  const [CurrentIndex, setCurrentIndex] = useState<number>(-1);
  const [SelectValue, setSelectValue] = useState<string>('');
  const [LastScreenData, setLastScreenData] = useState<LastScreenData | null>(
    null,
  );
  const [TestData, setTestData] = useState<TestData[]>(testData);

  // 시작 버튼
  const handleStartClick = (): void => {
    sessionStorage.setItem('index', '0');
    sessionStorage.setItem('sumId', '');
    setCurrentIndex(0);
  };

  const handleButtonClick = (event): void => {
    const buttonId: string = event.target.dataset.id;
    const sumId: string =
      buttonId === '1'
        ? SelectValue + TestData[CurrentIndex].select_1_id
        : SelectValue + TestData[CurrentIndex].select_2_id;
    const index: number = CurrentIndex + 1;

    // 마지막으로 선택지를 클릭 하였을 때
    if (index === TestData.length) {
      lastClick(sumId);
    }

    sessionStorage.setItem('sumId', sumId);
    setSelectValue(sumId);
    sessionStorage.setItem('index', index.toString());
    setCurrentIndex(CurrentIndex + 1);
  };

  const lastClick = async (sumId: string) => {
    try {
      const res = await fetcher('get', `/tests/${id}/results/${sumId}`);
      setLastScreenData(res.resultData[0]);
    } catch (error) {
      console.log('결과요청 페이지 에러', error);
    }
  };

  const handleReStartClick = (): void => {
    // 초기화
    sessionStorage.removeItem('index');
    sessionStorage.removeItem('sumId');
    setCurrentIndex(-1);
    setSelectValue('');
  };

  useEffect(() => {
    //  인덱스가 있는 세션스토리지에경우는 첫번째 화면을 제외한 나머지 화면
    if (sessionStorage.getItem('index')) {
      const index: number = parseInt(sessionStorage.getItem('index'));
      const sumId: string = sessionStorage.getItem('sumId');

      // 마지막 화면일 경우
      if (index === TestData.length) {
        lastClick(sumId);
        setCurrentIndex(index);
      } else {
        // 마지막 화면이 아닐경우 현재까지 보고있던 데이터 셋팅
        setCurrentIndex(index);
        setSelectValue(sumId);
      }
    }
    return () => {
      sessionStorage.removeItem('index');
      sessionStorage.removeItem('sumId');
    };
  }, []);

  return (
    <Wrapper>
      {CurrentIndex === -1 ? (
        <StartScreen title={title} handleStartClick={handleStartClick} />
      ) : CurrentIndex !== TestData.length ? (
        <QuestionImg>
          {TestData &&
            TestData.map((data: TestData, index: number) => (
              <Main
                key={index}
                opacity={CurrentIndex === index ? 1 : 0}
                question={data.question}
                select_1={data.select_1}
                select_2={data.select_2}
                handleButtonClick={handleButtonClick}
              ></Main>
            ))}
        </QuestionImg>
      ) : (
        LastScreenData && (
          <LastScreen
            lastScreenData={LastScreenData}
            handleReStartClick={handleReStartClick}
          ></LastScreen>
        )
      )}
    </Wrapper>
  );
};

export default MainContainer;
