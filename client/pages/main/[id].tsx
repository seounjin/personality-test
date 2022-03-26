import MainContainer from '../../components/MainContainer';
import fetcher from '../../api/fetcher';
import { MainProps } from '../../components/MainContainer/types';
import { GetStaticProps, GetStaticPaths } from 'next';

type Params = { id: string };

const MainPage = ({ mainStaticData }: MainProps): JSX.Element => {
  return (
    <>
      <MainContainer mainStaticData={mainStaticData}></MainContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 서버에 요청하는 것으로 바꿔야함
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
  const res = await fetcher('get', `/tests/${id}`);

  if (res) {
    const { testData, title, status } = res;
    if (status) {
      return {
        props: {
          error: { statusCode: status, message: 'Error!' },
        },
      };
    }
    return {
      props: { mainStaticData: { testData: testData, title: title, id } },
    };
  } else {
    return {
      props: {
        error: { statusCode: 500, message: 'Error!' },
      },
    };
  }
};

export default MainPage;
