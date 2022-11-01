import { Wrapper, Container, TitleWrapper, Title, SubTitle } from './styles';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ResultContainer from '../../components/ResultContainer';
import SelectContainer from '../../components/SelectContainer';
import UserForm from '../../components/UserForm/UserForm';
import { fetchAdminData } from '../../store/modules/admin';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../store';
import useAdmin from '../../hooks/useAdmin';
import AdminContent from '../../components/AdminContent/AdminContent';

const Admin = (): JSX.Element => {
  const { ImgFile, isResultScreen, handleImgFile } = useAdmin();

  return (
    <Wrapper>
      <Container>
        <TitleWrapper>
          <Title>만들어 보아요</Title>
        </TitleWrapper>

        <AdminContent>
          <SubTitle>유저 등록</SubTitle>
          <UserForm />
        </AdminContent>

        <AdminContent>
          <SubTitle>이미지 등록</SubTitle>
          <ImageUpload handleImgFile={handleImgFile} />
        </AdminContent>

        <AdminContent>
          <SubTitle>선택지 작성</SubTitle>
          <SelectContainer />
        </AdminContent>

        {isResultScreen && (
          <AdminContent>
            <SubTitle>결과 작성</SubTitle>
            <ResultContainer ImgFile={ImgFile} />
          </AdminContent>
        )}
      </Container>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const id = context.params.id;
    const cookie = context.req.headers.cookie ? context.req.headers.cookie : '';

    try {
      const res = await store
        .dispatch(fetchAdminData({ cardId: id, cookie: cookie }))
        .unwrap();
    } catch (error) {
      return {
        props: {
          error: { statusCode: error, message: 'Error!' },
        },
      };
    }
  });

export default Admin;
