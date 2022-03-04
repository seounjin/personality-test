import MainContainer from '../../components/MainContainer';
import fetcher from '../../api/fetcher';
import { GetStaticProps } from 'next';

const MainPage = ({ mainStaticData }) => {
  return (
    <>
      <MainContainer mainStaticData={mainStaticData}></MainContainer>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = [0, 0, 0].map((_, index) => ({
    params: { id: `${index + 1}` },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { testData, title } = await fetcher('get', `/test/${id}`);

  return {
    props: { mainStaticData: { testData: testData, title: title, id } },
  };
};

export default MainPage;
