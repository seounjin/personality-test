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
  const paths = [0, 0, 0].map((_, index) => ({
    params: { id: `${index + 1}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<MainProps, Params> = async ({
  params: { id },
}) => {
  const { testData, title } = await fetcher('get', `/test/${id}`);

  return {
    props: { mainStaticData: { testData: testData, title: title, id } },
  };
};

export default MainPage;
