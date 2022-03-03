import { useState, useEffect } from 'react';
import Entrance from './Entrance';
import QuestionImg from './QuestionImg';
import Main from './Main';
import LastScreen from './LastScreen';
import { useRouter } from 'next/router';
import fetcher from '../../api/fetcher';
import Wrapper from './styles';

export interface TestDataType {
  question: string;
  select_1: string;
  select_2: string;
  select_1_id: number;
  select_2_id: number;
}

const MainContainer = (): JSX.Element => {
  const [CurrentIndex, setCurrentIndex] = useState(-1);
  const [SelectValue, setSelectValue] = useState('');
  const [LastScreenData, setLastScreenData] = useState(null);
  const [TestData, setTestData] = useState([]);
  const router = useRouter();

  // 시작 버튼
  const handleStartClick = (): void => {
    sessionStorage.setItem('index', '0');
    sessionStorage.setItem('sumId', '');
    sessionStorage.setItem('test', JSON.stringify(TestData));

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
    if (index === 1) {
      lastClick(sumId);
    }

    sessionStorage.setItem('sumId', sumId);
    setSelectValue(sumId);
    sessionStorage.setItem('index', index.toString());
    setCurrentIndex(CurrentIndex + 1);
  };

  const lastClick = async (sumId: string) => {
    const { id } = router.query;
    const res = await fetcher('get', `/test?id=${id}&result=${sumId}`);
    if (res.success) {
      setLastScreenData(res.resultData[0]);
    }
  };

  const handleReStartClick = (): void => {
    // 초기화
    sessionStorage.removeItem('index');
    sessionStorage.removeItem('test');
    sessionStorage.removeItem('sumId');
    setCurrentIndex(-1);
    setSelectValue('');
    // setTestData([]);
  };

  const getTestItems = async () => {
    const { id } = router.query;
    const res = await fetcher('get', `/test/${id}`);
    if (res.success) {
      setTestData(res.testData);
    }
  };

  useEffect(() => {
    //  인덱스가 있는 세션스토리지에경우는 첫번째 화면을 제외한 나머지 화면
    if (sessionStorage.getItem('index')) {
      const index: number = parseInt(sessionStorage.getItem('index'));
      const sumId: string = sessionStorage.getItem('sumId');

      // 마지막 화면일 경우
      if (index === 1) {
        if (router.query.id !== undefined) {
          lastClick(sumId);
          setCurrentIndex(index);
        }
      } else {
        // 마지막 화면이 아닐경우 현재까지 보고있던 데이터 셋팅
        setTestData(JSON.parse(sessionStorage.getItem('test')));
        setCurrentIndex(index);
        setSelectValue(sumId);
      }
    } else {
      // 첫번째 화면 아이템 셋팅
      getTestItems();
    }
  }, [router]);

  return (
    <Wrapper>
      {CurrentIndex === -1 ? (
        <Entrance handleStartClick={handleStartClick}></Entrance>
      ) : CurrentIndex !== 1 ? (
        <QuestionImg>
          {TestData &&
            TestData.map((data: TestDataType, index: number) => (
              <Main
                key={index}
                CurrentIndex={CurrentIndex}
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
            LastScreenData={LastScreenData}
            handleReStartClick={handleReStartClick}
          ></LastScreen>
        )
      )}
    </Wrapper>
  );
};

export default MainContainer;
